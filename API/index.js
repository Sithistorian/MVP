Transfinite Ordinal Calculator: src/js/Calculation.js

API Docs for: 1.0
Modules
calculator
Classes
Bracket
Calculation
ClassedError
ComparisonData
config
model
oGui
Operand
Operator
Ord
OrdSummand
StackEl
util
Files
src/
js/
Calculation.js
Ord.js
globals.js
gui.js
init.js
initTest.js
model.js
preamble.js
stackEl.js
util.js
xlib.js

src/js/Calculation.js
/*! @file Calculation.js */

/*
 * part of the 'Transfinite Ordinal Calculator'
 * author: Claudio Kressibucher
 * license: GNU LGPL
 */

/* JSHINT global declaration */
/*global oGui:true, util:true, config:true, ClassedError:true, Ord:true, OrdSummand:true, model:true, Calculation:true */

// ============================================================ //
// ===== 01) Constructor ====================================== //
// ============================================================ //
/**
 * Class to compute the result of an operation
 * of two ordinal numbers.
 *
 * The intended usage to perform an arithmetic operation is as follows:
 * First, you create a Calculation object by invoking the constructor.
 * Then you invoke the simplify-Method on the object, which returns
 * a normalized Ordinal as an object of type Ord.
 * When comparing two Ordinals (type Ord) against each other,
 * directly call the static Calculation.compare method.
 * All other methods should not be used from outside the class.
 *
 * @class Calculation
 * @constructor
 * @param {Operand / Ord / OrdSummand / number} leftOpnd
 * @param {Operand / Ord / OrdSummand / number} rightOpnd
 * @param {Operator} optor
 */
Calculation = function Calculation(leftOpnd, rightOpnd, optor){
        // cache the enumType object literal
        var eT = model.enumType;

        /**
         * The left operand.
         * @property left
         * @type Ord
         */
        this.left = null;
        /**
         * The right operand.
         * @property right
         * @type Ord
         */
        this.right = null;
        /**
         * The operator. Possible values are "^", "*", "+".
         * @property optor
         * @type string
         */
        this.optor = optor.getSymbol();
        /**
         * If there is an error message, then that indicates that an
         * error has occurred
         * @property calcErr
         * @type ClassedError
         * @private
         */
        this.calcErr = null;

        if (config.debug > 0){
                        util.assert(optor.getType() === eT.tOptor,
                                        "Calculation construtor: wrong type of operator");
        }

        // get left operand as instance of Ord
        if (leftOpnd instanceof Ord){
                this.left = leftOpnd;
        } else if (leftOpnd instanceof OrdSummand) {
                this.left = new Ord(leftOpnd);
        } else if (typeof(leftOpnd) === 'number'){
                this.left = new Ord(leftOpnd);
        } else if (leftOpnd instanceof model.Operand){
                this.left = leftOpnd.getOrd();
        } else {
                oGui.dbgErr("Calculation constructor: wrong type of left Operand");
        }

        // the same for the right operand
        if (rightOpnd instanceof Ord){
                this.right = rightOpnd;
        } else if (rightOpnd instanceof OrdSummand) {
                this.right = new Ord(rightOpnd);
        } else if (typeof(rightOpnd) === 'number'){
                this.right = new Ord(rightOpnd);
        } else if (rightOpnd instanceof model.Operand) {
                this.right = rightOpnd.getOrd();
        } else {
                oGui.dbgErr("Calculation constructor: wrong type of right Operand");
        }
};

Calculation.maxNatural = 1000000000; // 10^9 is the maximal natural number that's allowed (due to inaccurracy caused by floating point arithmetic)

//============================================================ //
//===== 02) Public Functions ================================= //
//============================================================ //
/**
 * Simplifies the expression consisting of left operand,
 * right operand and operator.
 * @method simplify
 * @return {Ord} The result of the calculation as a normalized
 * object of type Ord.
 */
Calculation.prototype.simplify = function simplify(){
        var res = null; // the result to return

        switch(this.optor){
        case '^':
                res = this.expOrdinals();
                break;

        case '*':
                res = this.multiplyOrdinals();
                break;

        case '+':
                res = this.sumOrdinals();
                break;
        }

        if (this.calcErr !== null){
                res = null;
        } else if (res === null || res === false || res.isUndefined()){
                this.calcErr = this.calcErr || new ClassedError("unknown Calculation error", ClassedError.types.calcError);
                res = null;
        } else {
                res.cleanUp();
        }
        return res;
};

/**
 * The main compare function. Use this method from outside the
 * Calculation class to compare two ordinals -- which may also
 * be of type 'number' -- against each other.
 * @method compare
 * @param {Ord / number} a The first operand. Might be an instance of Ord
 *  or a simple integer of type 'number'.
 * @param {Ord / number} b The second operand. Same type conventions.
 * @return {number} The result. A value greater 0 means that a is greater
 * than b, a value less than 0 means that b is greater than a, and the value
 * 0 means that a and b are equal.
 * @static
 */
Calculation.compare = function compare(a, b){
        var tCmp; // temporary comparison result
        var cmpValue = null;

        if (! (a instanceof Ord) ){
                if (b instanceof Ord){
                        // a is a natural number, b is an Ordinal
                        cmpValue = Calculation.cmpNaturalOrdinal(a, b);
                } else {
                        // a and b are natural numbers
                        cmpValue = Calculation.cmpNatural(a, b);
                }
        } else { // a is Ordinal (type Ord)
                if (! (b instanceof Ord) ){
                        // a is an Ordinal, b is a natural number
                        tCmp = Calculation.cmpNaturalOrdinal(b, a);
                        cmpValue = (-1) * tCmp;
                } else {
                        // a and b are both ordinals
                        cmpValue = Calculation.compareOrdinals(a, b);
                }
        }

        if (cmpValue === null){
                oGui.dbgErr("Calculation.compare: Comparision failed, result is null");
        }
        return cmpValue;
};

Calculation.prototype.getError = function getError(){
        var tmp;
        if (this.calcErr !== null){
                tmp = this.calcErr;
                this.calcErr = null;
                return tmp;
        }
        return null;
};

//============================================================ //
//===== 03) main arithmetic functions ======================== //
//========= (object methods) ================================= //
//============================================================ //

/**
 * Calculates the ordinal sum of (left + right).
 * @method sumOrdinals
 * @return {Ord} the result
 * @private
 */
Calculation.prototype.sumOrdinals = function sumOrdinals(){
        var a = this.left;
        var b = this.right;

        var res; // the result
        var i = 0; // index of left operand's current summand
        var j = 0; // index of right operand's current summand
        var sumA; // current summand of left operand
        var sumB; // current summand of right operand
        var expA, expB; // exponents of sumA and sumB
        var tmpFactor; // temporary factor

        if (! this.checkOpnds()){
                oGui.dbgErr("error occurred in Calculation.sumOrdinals");
                return null;
        }

        res = new Ord();

        sumA = a.getSummand(i);
        sumB = b.getSummand(j);
        expA = sumA.getExponent();
        expB = sumB.getExponent();

        while ( Calculation.compare(expA, expB) > 0 ){ // while expA > expB: add terms of a
                res.addSummand(sumA);
                i++;
                if (i >= a.getNumOfSumds()){
                        break;
                }
                sumA = a.getSummand(i);
                expA = sumA.getExponent();
        }

        // add first term of b
        tmpFactor = sumB.getFactor();
        if ( i < a.getNumOfSumds() && Calculation.compare(expA, expB) === 0 ){ // a has term with the same exponent: increase factor of term
                tmpFactor += sumA.getFactor();
                if (!Calculation.sIsValidNatural(tmpFactor)) {
                        this.calcErr = this.calcErr || new ClassedError("natural factor " + tmpFactor + " is too great and could cause inaccurate calculations.", ClassedError.types.inaccurate);
                        return null;
                }
        }
        res.addSummand( new OrdSummand(expB, tmpFactor) );

        // increase index of operand b
        j++;

        while ( j < b.getNumOfSumds() ){ // add the rest of b's terms
                res.addSummand( b.getSummand(j) );
                j++;
        }

        return res;
};

/**
 * Calculates the ordinal (left * right).
 * @method multiplyOrdinals
 * @return {Ord} the result
 * @private
 */
Calculation.prototype.multiplyOrdinals = function multiplyOrdinals(){
        var res;

        var a = this.left;
        var b = this.right;

        var i = 0; // index of left operand's current summand
        var j = 0; // index of right operand's current summand
        var sumA; // current summand of left operand
        var sumB; // current summand of right operand
        var expA, expB; // exponents of sumA and sumB

        var tmpFac; // temporary factor
        var tmpExp; // temporary exponent
        var calc;

        if (! this.checkOpnds()){
                oGui.dbgLog("error occurred in Calculation.multiplyOrdinals");
                return null;
        }

        res = new Ord();

        if (a.equalsNull() || b.equalsNull()){
                return new Ord(0);
        }

        sumA = a.getSummand(i);
        sumB = b.getSummand(j);
        expA = sumA.getExponent();
        expB = sumB.getExponent();

        while( Calculation.compare(0, expB) < 0  ){ // expB > 0
                calc = new Calculation(expA, expB, new model.Operator('+'));
                tmpExp = calc.sumOrdinals();
                res.addSummand( new OrdSummand(tmpExp, sumB.getFactor()) );
                j++;
                if (j >= b.getNumOfSumds()){ // no summands left
                        break;
                }
                sumB = b.getSummand(j);
                expB = sumB.getExponent();
        }

        if (j < b.getNumOfSumds()){ // there's one natural summand left in b
                tmpFac = sumA.getFactor() * sumB.getFactor();
                if (!Calculation.sIsValidNatural(tmpFac)){
                        this.calcErr = this.calcErr || new ClassedError("muliplication: natural factor too large...", ClassedError.types.inaccurate);
                        return null;
                }
                res.addSummand( new OrdSummand(expA, tmpFac) );
                i++;
                while(i < a.getNumOfSumds()){ // there are some summands left in a
                        sumA = a.getSummand(i);
                        // expA = sumA.getExponent();
                        // res.addSummand( new OrdSummand(expA, sumA.getFactor()) );
                        res.addSummand( sumA );
                        i++;
                }
        }

        if (res.isUndefined()){
                oGui.dbgWarn("Calculation.multiplyOrdinals: res has no summand at the end of calculation... return null");
                this.calcErr = this.calcErr || new ClassedError("unknown calculation error", ClassedError.types.calcError);
                res = null;
        }
        return res;
};

/**
 * Calculates the ordinal (left ^ right).<br />
 * Might pass through an exception from the method sFinitePower
 * @method expOrdinals
 * @return {Ord} the result
 * @private
 */
Calculation.prototype.expOrdinals = function(){
        var res = null;

        var a = this.left;
        var b = this.right;

        var num;

        var i; // index of right operand's current summand
        var bLen; // length of right operand (number of terms)

        var tmpOrd1, tmpOrd2, tmpSum = null, tmpExp, tmpFac;

        var eHasNatTerm = false; // boolean flag, if exponent has a natural term

        if (! this.checkOpnds()){
                oGui.dbgLog("error occurred in Calculation.multiplyOrdinals");
                return null;
        }

        if (b.isNatural()){
                if (a.isNatural()) {
                        // a < omega, b < omega => natural exponentiation
                        num = Math.pow(a.getSummand(0).getFactor(), b.getSummand(0).getFactor());
                        if (!Calculation.sIsValidNatural(num)){
                                this.calcErr = this.calcErr || new ClassedError( "exponentiation: natural number is too large...", ClassedError.types.inaccurate);
                                return null;
                        }
                        res = new Ord( num );
                } else {
                        // a >= omega, b < omega
                        // finite exponentiation
                        res = Calculation.sFinitePower(a, b.getSummand(0).getFactor(), this);
                }
        } else {
                // b >= omega
                if (a.equalsNull()){
                        res = new Ord(0); // 0^b = 0 (if b > 0)
                } else if (a.equalsOne()){
                        res = new Ord(1); // 1^b = 1
                } else if (a.isNatural()) {
                        // 1 < a < omega, b >= omega
                        bLen = b.getNumOfSumds();
                        tmpOrd1 = new Ord(); // this Ord is the exponent of the only term of the result

                        for (i = 0; i < bLen; i++){
                                tmpSum = b.getSummand(i);
                                tmpExp = tmpSum.getExponent();
                                if ( ! Calculation.sIsValueNull(tmpExp) ){
                                        tmpOrd2 = Calculation.decreaseOne( tmpExp ); // b(i).exp - 1
                                        tmpOrd1.addSummand( new OrdSummand(tmpOrd2, tmpSum.getFactor()) );
                                } else {
                                        eHasNatTerm = true;
                                        if (config.debug > 0){
                                                util.assert(i === bLen-1); // should be the last summand!
                                        }
                                }
                        }

                        if (eHasNatTerm === true){ // natural term in exponent
                                tmpFac = Math.pow(a.getSummand(0).getFactor(), tmpSum.getFactor());
                                if (!Calculation.sIsValidNatural(tmpFac)){
                                        this.calcErr = this.calcErr || new ClassedError( "exponentiation: natural factor is too large...", ClassedError.types.accurate);
                                        return null;
                                }
                        } else {
                                tmpFac = 1;
                        }

                        res = new Ord( new OrdSummand(tmpOrd1, tmpFac) );
                } else {
                        // a >= omega, b >= omega
                        res = Calculation.sInfPower(a, b, this);
                }
        }

        if (res === null || res === false || res.isUndefined()){
                oGui.dbgErr('Calculation.expOrdinals: res is null or undefined');
                this.calcErr = this.calcErr || new ClassedError("unknown calc error", ClassedError.types.calcError);
                res = null;
        }
        return res;
};

//============================================================ //
//===== 04) arithmetic helper functions ====================== //
//============================================================ //

/**
 * Helper method for expOrdinals(): Calculates the power
 * of an infinite base and a finite exponent.
 * Should only be used from inside the Calculation class.<br />
 * Throws an error (of type ClassedError) when the exponent is too great.
 * @method sFinitePower
 * @param {Ord} oBase The Base. Must be an Ordinal. (And should be
 * greater than / equal to omega).
 * @param {number} nExp The exponent. Must be an instance of number!
 * @param {Calculation} cObj Optional. If defined, the static method can
 * register an error to the object.
 * @return {Ord} result The result of the exponentiation.
 * @static
 * @private
 */
Calculation.sFinitePower = function sFinitePower(oBase, nExp, cObj){
        var i = 0;
        var j = 0;
        var sumA; // summand of oBase
        var expA; // exponent of sumA
        var nk; // factor of natural term of oBase
        var staticFactor;

        var res;

        var tmpExp;
        var num;
        var calc;

        var firstExpA;
        var staticExp;

        var maxExp = 25; // the maximum allowed exponent, if the base Ord contains a natural term (prevents results with too many terms).

        // check operands (special!)
        if (! oBase instanceof Ord){
                oGui.dbgErr("Calclulation.sFinitePower: wrong type of argument oBase");
                return null;
        }
        if (typeof(nExp) !== 'number'){
                oGui.dbgErr("Calclulation.sFinitePower: wrong type of argument nExp");
                return null;
        }
        // check basic operations (for stability reasons...)
        if (oBase.isNatural()){
                num = Math.pow( oBase.getSummand(0).getFactor(), nExp );
                if (!Calculation.sIsValidNatural(num)){
                        oGui.dbgWarn("exponentiation: natural factor too large");
                        if (cObj){
                                cObj.calcErr = cObj.calc || new ClassedError( "exponentiation: natural factor is too large ...", ClassedError.types.inaccurate);
                        }
                        return null;
                }
                return new Ord( num );
        }
        if (nExp === 0){
                return new Ord(1);
        }
        if (nExp === 1){
                return oBase;
        }
        // normal cases: oBase >= omega; 1 < nExp < omega
        sumA = oBase.getSummand(0);
        expA = sumA.getExponent();
        firstExpA = expA;

        res = new Ord();

        // terms with exponent > 0 (limes terms)
        calc = new Calculation(firstExpA, nExp-1, new model.Operator('*'));
        staticExp = calc.multiplyOrdinals();
        do {
                sumA = oBase.getSummand(i);
                expA = sumA.getExponent();
                if (Calculation.sIsValueNull(expA)) {
                        break;
                }
                calc = new Calculation(staticExp, expA, new model.Operator('+'));
                tmpExp = calc.sumOrdinals();
                // now tmpExp is a_1 *(nExp-1) + a_i
                res.addSummand(new OrdSummand(tmpExp, sumA.getFactor()));
                i++;
        } while(i < oBase.getNumOfSumds());

        if (Calculation.sIsValueNull(expA)){ // operand oBase has a natural term
                if (nExp > maxExp){
                        // too many terms in result: cancel operation
                        oGui.dbgWarn("sFinitePower: too many terms");
                        if (cObj){
                                cObj.calcErr = cObj.calcErr || new ClassedError("too many terms for this small display... The exponent for this type of " +
                                                "exponentiation should be less than " + (maxExp+1) + ".", ClassedError.types.finExpTooLarge);
                        }
                        return null;
                }
                nk = sumA.getFactor();
                if (nk <= 0) {
                        // ignore term "+0" in base operand
                        return res;
                }
                staticFactor = oBase.getSummand(0).getFactor() * nk;
                if (!Calculation.sIsValidNatural(staticFactor)){
                        oGui.dbgErr("sFinitePower: invalid factor");
                        if (cObj){
                                cObj.calcErr = cObj.calcErr || new ClassedError( "exponentiation: natural factor is too large ...", ClassedError.types.inaccurate);
                        }
                        return null;
                }
                for(j = 1; j < nExp; j++){
                        calc = new Calculation(firstExpA, nExp-j, new model.Operator('*'));
                        tmpExp = calc.multiplyOrdinals();
                        res.addSummand(new OrdSummand(tmpExp, staticFactor));
                        i = 1;
                        while(i < (oBase.getNumOfSumds()-1)){ // stop before the last term cause we already know that it has exponent 0
                                sumA = oBase.getSummand(i);
                                expA = sumA.getExponent();
                                if (config.debug > 0){
                                        util.assert(expA !== 0 && !(expA instanceof Ord && expA.equalsNull())); // expA is not 0
                                }
                                calc = new Calculation(firstExpA, nExp-j-1, new model.Operator('*'));
                                tmpExp = calc.multiplyOrdinals();
                                if (tmpExp === null)
                                        return null;
                                calc = new Calculation(tmpExp, expA, new model.Operator('+'));
                                tmpExp = calc.sumOrdinals();
                                if (tmpExp === null)
                                        return null;
                                res.addSummand( new OrdSummand(tmpExp, sumA.getFactor()) );
                                i++;
                        }
                }
                res.addSummand( new OrdSummand(0, nk) );
        }

        return res;
};

/**
 * Helper method for expOrdinals(): Calculates the power
 * of an infinite base and an infinite exponent.
 * Should only be used from inside the Calculation class.
 * @method sInfPower
 * @param {Ord} oBase The Base. Must be an Ord AND must be
 * greater than / equal to omega.
 * @param {Ord} oExp The exponent. Must be an instance of Ord
 * @param {Calculation} cObj Optional. If defined, the static method can
 * register an error to the object.
 * @return {Ord} The result.
 * @static
 * @private
 */
Calculation.sInfPower = function sInfPower(oBase, oExp, cObj){
        var res = null;

        var firstSumBase;
        var firstExpBase;

        var i; // index of right operand's current summand
        var eLen; // length of right operand (number of terms)
        var sumE = null; // current summand of right operand
        var expE;

        var tmpOrd1, tmpOrd2;
        var calc;

        var eHasNatTerm = false; // flag, if exponent has a natural term

        // check operands
        if (! oBase instanceof Ord || ! oExp instanceof Ord){
                oGui.dbgErr('Calculation.sInfPower: one of the operands is not of type Ord');
                return null;
        }

        // check basic operations (just for stability)
        if (oExp.isNatural()){
                oGui.dbgWarn('Calculation.sInfPower: exponent should not be natural');
                return Calculation.sFinitePower(oBase, oExp.getSummand(0).getFactor());
        }
        if (oBase.isNatural()){
                oGui.dbgErr('Calculation.sInfPower: The base operand must not be natural');
        } else {
                // oBase >= omega; oExp >= omega
                eLen = oExp.getNumOfSumds();
                firstSumBase = oBase.getSummand(0);
                firstExpBase = firstSumBase.getExponent();

                tmpOrd1 = new Ord();

                for (i = 0; i < eLen; i++){
                        sumE = oExp.getSummand(i);
                        expE = sumE.getExponent();
                        if ( ! Calculation.sIsValueNull(expE) ){
                                tmpOrd1.addSummand(sumE);
                        } else {
                                eHasNatTerm = true;
                                if (config.debug > 0) {
                                        util.assert(i === eLen-1); // should be the last summand!
                                }
                        }
                }

                calc = new Calculation(firstExpBase, tmpOrd1, new model.Operator('*'));
                tmpOrd2 = calc.multiplyOrdinals();
                if (tmpOrd2 === null)
                        return null;
                res = new Ord( new OrdSummand(tmpOrd2, 1) );

                if (eHasNatTerm === true){ // natural term in exponent
                        tmpOrd2 = Calculation.sFinitePower(oBase, sumE.getFactor(), cObj);
                        if (tmpOrd2 === null)
                                return null;
                        calc = new Calculation(res, tmpOrd2, new model.Operator('*'));
                        res = calc.multiplyOrdinals();
                }
        }

        if (res === null || res === false || res.isUndefined()){
                if (cObj){
                        cObj.calcErr = cObj.calcErr || new ClassedError("unknown calc error", ClassedError.types.calcError);
                }
                res = null;
        }
        return res;
};

/**
 * Compare an Operand of type Ord with a primitive integer operand.
 * @method cmpNaturalOrdinal
 * @param {number} natural
 * @param {Ord} ordinal
 * @return {number} If natural is greater than ordinal, a value greater 0;
 *  If natural and ordinal are the same size, the value 0;
 *  and if natural is less than ordinal, a value less than 0 is returned.
 * @static
 * @private
 */
Calculation.cmpNaturalOrdinal = function(natural, ordinal){
        var first; // first summand
        var fac; // factor of first

        if (ordinal.isUndefined()){
                return null;
        }
        first = ordinal.getSummand(0);

        if (ordinal.isNatural()){
                fac = first.getFactor();
                if (natural > fac){
                        return 1;
                } else if (natural < fac){
                        return -1;
                } else {
                        return 0;
                }
        }

        // otherwise the ordinal is greater...
        return -1;
};

/**
 * Compare two integers (type "number") operands.
 * @method cmpNatural
 * @param {number} a
 * @param {number} b
 * @return {Number} A value greater 0 if argument a is greater than b,
 * a value less than 0 if a is less than b,
 * and the value 0 if a is equal to b
 * @private
 * @static
 */
Calculation.cmpNatural = function(a, b){
        if (config.debug > 0){
                util.assert(typeof(a) === "number" && typeof(b) === "number",
                                "Calculation.cmpNatural: Arguments have types other than number...");
        }
        if (a > b) {
                return 1;
        }
        if (a < b) {
                return -1;
        }
        return 0;
};

/**
 * Compare the value of two Ordinal numbers (objects of type Ord).
 * @method compareOrdinals
 * @param {Ord} a The first value to compare
 * @param {Ord} b The second value to compare
 * @return {Number} A value greater 0 if argument a is greater than b,
 * a value less than 0 if a is less than b,
 * and the value 0 if a is equal to b
 * @static
 */
Calculation.compareOrdinals = function compareOrdinals(a, b){
        var sumA;
        var sumB;
        var i = 0;
        var j = 0;
        var cmpSumds;

        if (config.debug > 0){
                util.assert(a instanceof Ord && b instanceof Ord);
        }

        // compare summands
        while (i < a.getNumOfSumds() && j < b.getNumOfSumds()){
                sumA = a.getSummand(i);
                sumB = b.getSummand(j);
                // compare summands
                cmpSumds = sumA.isGreaterThan(sumB);
                if (cmpSumds !== 0){
                        return cmpSumds;
                }
                // summands are equal: continue with next ones
                i++;
                j++;
        }

        // one ordinal has reached the end of it's list of summands
        if (i >= a.getNumOfSumds()){ // compare j-th summand of b with 0
                if (j >= b.getNumOfSumds() ||
                                b.getSummand(j).getFactor() <= 0){
                        return 0; // both ordinals have reached the end...
                }
                // j-th summand of b is greater than 0 => b is greater than a
                return -1;
        } else {
                if (config.debug > 0){
                        util.assert( (j >= b.getNumOfSumds()), "Error in Calculation.compareOrdinals");
                }
                // a has summand, b not => compare i-th summand of a with 0
                if (a.getSummand(i).getFactor() <= 0){
                        return 0;
                }
                return 1; // factor > 0 => a is greater than b
        }
};

/**
 * Decrease the argument "ord" by one, so
 * that: 1 + ( decreaseOne(ord) ) = ord.
 * @method decreaseOne
 * @param {Ord / number} ord
 * @return {Ord} The result as an Ord object
 * @static
 * @private
 */
Calculation.decreaseOne = function decreaseOne(ord){
        var o = Calculation.natToOrd(ord);
        if (o.isNatural()){
                return new Ord( o.getSummand(0).getFactor() - 1 );
        } else {
                return ord;
        }
};

/**
 * Static function to check if value is 0,
 * whether it is of type Ord or a number.
 * @method sIsValueNull
 * @param {Ord / number} val
 * @return {boolean} True, if val === 0 or val.equalsNull()
 * @static
 * @private
 */
Calculation.sIsValueNull = function(val){
        if (typeof(val) === 'number'){
                return val === 0;
        } else if (val instanceof Ord){
                return val.equalsNull();
        } else {
                oGui.progError("Calculation.sIsValueNull: wrong type of argument.");
        }
};

/**
 * Tests if a value is inside a range from 0 to Calculation.maxNatural.
 * Natural numbers shouldn't exceed this value in this application, as
 * there could result inaccurate calculations due to javascripts
 * floating arithmetic.
 * @method sIsValidNatural
 * @param {number} val The value to test
 * @return {boolean} True if val is a valid natural.
 */
Calculation.sIsValidNatural = function (val){
        if (typeof(val) !== 'number')
                return false;

        return isFinite(val) && val >= 0 && val <= Calculation.maxNatural;
};

//============================================================ //
//===== 05) other helper functions =========================== //
//============================================================ //

/**
 * Converts a value of type 'number' into an Ord object.
 * If num is already an Ord object, it will be returned unchanged.
 * @method natToOrd
 * @param {Ord / number} num
 * @return {Ord} The value num represented by an Ord object
 * @static
 */
Calculation.natToOrd = function natToOrd(num){
        if (typeof(num) === 'number'){
                return new Ord(num);
        }
        if (! (num instanceof Ord)){
                oGui.progError("Calculation.natToOrd: argument should be a natural number or an instance of Ord");
        }
        return num;
};

/**
 * Checks if the operands of the calculation object
 * are of type Ord and have at least
 * one summand (i.e. are not undefined).
 * @method checkOpnds
 * @return {boolean} True if operands are of type Ord and have
 *  one or more summands, False otherwise.
 * @private
 */
Calculation.prototype.checkOpnds = function checkOpnds(){
        if (! (this.left instanceof Ord)){
                oGui.dbgErr("Calculation.checkOpnds: the left operator is not of type \"Ord\"");
                return false;
        }
        if (! (this.right instanceof Ord)){
                oGui.dbgErr("Calculation.checkOpnds: the right operator is not of type \"Ord\"");
                return false;
        }

        if (this.left.isUndefined()){
                oGui.dbgErr("Calculation.checkOpnds: the left operand is an undefined Ord object");
                return false;
        }
        if (this.right.isUndefined()){
                oGui.dbgErr("Calculation.checkOpnds: the right operand is an undefined Ord object");
                return false;
        }
        return true;
};