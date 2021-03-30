/*! @file Ord.js */

/*
 * part of the 'Transfinite Ordinal Calculator'
 * author: Claudio Kressibucher
 * license: GNU LGPL
 */

/* JSHINT global declaration */
/*global oGui:true, Ord:true, OrdSummand:true, Calculation:true */

var Ord;
var OrdSummand;

//============================================================= //
//=============== class Ord =================================== //
//============================================================= //

/**
 * Construtor to build an ordinal number as an
 * object containing a list of OrdSummand objects.
 * Note that such an object must be normalized
 * (the exponents of the summands are decreasing
 * with increasing index).
 * @class Ord
 * @param {OrdSummand / number} ordSummand The first summand of the
 * ordinal number. If ordSummand is an instance of OrdSummand, it is directly
 * put in its place. Otherwise it has to
 * be a natural number, then a new instance of OrdSummand is created which
 * represents this natural number, and which is finally appended to the new Ord object.
 * @constructor
 */
Ord = function Ord(ordSummand){
        /**
         * List of Summands of this Ordinal.
         * @property sumds
         * @type OrdSummand[]
         */
        this.sumds = [];

        if (typeof(ordSummand) !== 'undefined'){
                if (ordSummand instanceof OrdSummand) {
                        this.sumds.push(ordSummand);
                } else if (typeof(ordSummand) === 'number'){
                        // create a new summand
                        this.sumds.push( new OrdSummand(0, ordSummand) );
                }
        }
};

/**
* Checks if this Ordinal Number is a natural integer.
* Presumes that this ordinal is normalized!
* @method isNatural
* @return {boolean} True if this is a natural integer
*/
Ord.prototype.isNatural = function isNatural(){
        //return this.sumds.length === 1 && this.sumds[0].getExponent() === 0;
        var firstExp;
        if (this.sumds.length === 1){
                firstExp = this.sumds[0].getExponent();
                if (firstExp === 0) {
                        return true;
                } else if (firstExp instanceof Ord) {
                        return firstExp.equalsNull(); // equalsNull returns true, even if there are deep nested structures of Ord objects
                }
        }
        return false;
};

/**
 * Checks if this Ordinal is undefined, i.e. it contains no
 * summand.
 * @method isUndefined
 * @return {boolean} True if this Ordinal has no summands
 */
Ord.prototype.isUndefined = function isUndefined(){
        return this.sumds.length === 0;
};

/**
 * Checks if this Ordinal number would be equal to the
 * natural number "0". Presumes that this Ordinal is
 * normalized.
 * @method equalsNull
 * @return {boolean} True, if this == 0.
 */
Ord.prototype.equalsNull = function (){
        var sumd;
        var res = false;

        if (this.sumds.length === 1){
                sumd = this.sumds[0];
                if (sumd.getFactor() === 0){
                        res = true;
                }
        }

        return res;
};

/**
 * Checks if this Ordinal number is equal to the
 * natural number "1". Presumes that this Ordinal
 * is normalized.
 * @method equalsOne
 * @return {boolean} True, if this == 1
 */
Ord.prototype.equalsOne = function equalsOne(){
        var firstSumd;
        var exp;

        if ( this.sumds.length !== 1 )
                return false;

        firstSumd = this.sumds[0];
        exp = firstSumd.getExponent();
        if (exp === 0 ||
                        exp instanceof Ord && exp.equalsNull())
        {
                return firstSumd.getFactor() === 1;
        }

        return false;
};

/**
 * Checks if this Ordinal number is equal to the
 * ordinal number "omega". Presumes that this Ordinal
 * is normalized.
 * @method equalsOmega
 * @return {boolean} True, if this == omega
 */
Ord.prototype.equalsOmega = function (){
        var firstSumd, exp;
        if (this.sumds.length !== 1){
                return false;
        }
        firstSumd = this.sumds[0];
        if (firstSumd.getFactor() !== 1){
                return false;
        }
        exp = firstSumd.getExponent();
        return (exp === 1) || (exp instanceof Ord && exp.equalsOne());
};

/**
 * Returns the summand with the given Index.
 * @method getSummand
 * @param {number} i The index of the summand. The first
 * summand has the index 0.
 * @return {OrdSummand} The Summand at position i
 */
Ord.prototype.getSummand = function getSummand(i){
        if (this.sumds[i])
                return this.sumds[i];

        oGui.dbgErr("Ord.getSummand(): Summand with index i = " + i + " does not exist.");
        return null;
};

/**
 * Append a summand to the end of the list. Note that you have
 * to be sure not to violate the normalized form of the
 * Ordinal!
 * @method addSummand
 * @param {OrdSummand} summand The summand to append.
 */
Ord.prototype.addSummand = function addSummand(summand){
        this.sumds.push(summand);
};

/**
 * Get the number of summands stored in this ordinal.
 * @method getNumOfSumds
 * @return {number} The number of summands building this
 * ordinal
 */
Ord.prototype.getNumOfSumds = function (){
        return this.sumds.length;
};

/**
 * Checks for Summands with factor 0 and removes them.
 * Also replaces natural exponents of type Ord with
 * its <pre>number</pre> representations to simplify further
 * calculations and the output representation.
 * @method cleanUp
 */
Ord.prototype.cleanUp = function (){
        var i;
        var sumd;
        var exp;
        var len = this.sumds.length;

        for (i = 0; i < len; i++){
                sumd = this.sumds[i];
                if (sumd.getFactor() === 0 && len > 1){
                        this.sumds.splice(i, 1); // remove this summand, as it represent the value 0
                        i--; // prevent skipping of the next summand as result of removing this one
                        len--;
                } else {
                        exp = sumd.getExponent();
                        if (typeof exp === 'number'){
                                sumd.exp = exp; // replace the exponent (potentially of type Ord) with exp of type number
                        } else {
                                // assert exp instanceof Ord
                                exp.cleanUp();
                        }
                }
        }
};

/**
 * Converts this ordinal number into a flat array
 * which can easily be converted to a string.
 * @method serialize
 * @param {Array} arr Reference to an array which will
 * be extended with the data of this ordinal.
 * @param {boolean} htmlStyle. If true, the serialization
 * generates a html representation.
 */
Ord.prototype.serialize = function serialize(arr, htmlStyle){
        var i = 0;

        while(i < this.sumds.length){
                if (i > 0){
                        arr.push('+'); // operator between summands
                }
                this.sumds[i].serialize(arr, htmlStyle);
                i++;
        }
};

/**
 * Returns a string representation of the Ord object.
 * @method toString
 * @param {boolean} htmlStyle Optional. If true, a HTML-Format is generated,
 * especially omega is espressed as '&omega;' instead of 'w'.
 * @return {string} The string representation of this object.
 */
Ord.prototype.toString = function toString(htmlStyle){
        var a = [];
        this.serialize(a, htmlStyle);
        return a.join('');
};

// ============================================================= //
// =============== class OrdSummand ============================ //
// ============================================================= //

/**
 * Constructor to create a triple omega ^ ord * n, representing a term (or
 * a summand) of an Ord object.<br />
 * The base is always omega, the exponent and the factor can be defined by the parameters.
 * Note that you must ensure not to violate the normalized form
 * of the Ord to which this OrdSummand will be appended.
 * @class OrdSummand
 * @constructor
 * @param {Ord / number} exponent The exponent of the triple. If undefined, the value will be 0.
 * @param {number} fac The factor of the triple. If undefined, the value will be 1.
 */
OrdSummand = function OrdSummand(exponent, fac){
        if (typeof(exponent) === "undefined" || typeof(fac) === "undefined"){
                oGui.dbgWarn("OrdSummand constructor: it's recommended to define " +
                                "the exponent and the factor explicitly.");
        }

        /**
         * The exponent of the OrdSummand triple.
         * @property exp
         * @type Ord / number
         */
        this.exp = typeof(exponent) !== 'undefined' ? exponent : 0;
        /**
         * The factor of the OrdSummand triple
         * @property factor
         * @type number
         */
        this.factor = typeof(fac) !== 'undefined' ? fac : 1;
};

/**
 * Get the exponent. Note that this method returns an Ord object
 * if the exponent is greater or equal to omega, and a number
 * if the exponent is a natural number (is less than omega).
 * @method getExponent
 * @return {Ord / number} The exponent
 */
OrdSummand.prototype.getExponent = function getExponent(){
        if (this.exp instanceof Ord && this.exp.isNatural()){
                return this.exp.getSummand(0).getFactor(); // must return a number! This is required by other methods calling getExponent()
        }
        // assert: typeof this.exp === 'number' || this.exp > omega
        return this.exp;
};

/**
 * Get the factor.
 * @method getFactor
 * @return {number} The factor
 */
OrdSummand.prototype.getFactor = function getFactor(){
        return this.factor * 1; // the multiplication by 1 ensures that the return value is of type number (and not of type string)
};

/**
 * Serializes the data of this OrdSummand recursively and
 * appends the single components to the array given as
 * parameter
 * @method serialize
 * @param {array} arr The Array to which the data will be appended.
 * @param {boolean} htmlStyle. If true, the serialization
 * generates a html representation.
 */
OrdSummand.prototype.serialize = function serialize(arr, htmlStyle){
        var useBrackets = false;
        if (this.exp instanceof Ord && this.exp.isNatural()){
                this.exp = this.exp.getSummand(0).getFactor();
        }
        // now this.exp is of type 'number' when it is natural...
        if (this.exp === 0){
                arr.push('' + this.factor);
        } else if (this.factor === 0){
                arr.push( "0" );
        } else {
                // exp > 0 && factor > 0
                if (htmlStyle)
                        arr.push('&omega;');
                else
                        arr.push('w');

                if (typeof(this.exp) === "number" && this.exp > 1){ // a natural exponent > 1
                        arr.push('^' + this.exp);
                } else if ( this.exp instanceof Ord ){ // does not equal one, otherwise this.exp would be of type 'number'
                        useBrackets = !this.exp.equalsOmega();
                        arr.push('^');
                        if (useBrackets)
                                arr.push('(');
                        this.exp.serialize(arr, htmlStyle);
                        if (useBrackets)
                                arr.push(')');
                } // else: exponent is 1 => don't write

                if (this.factor !== 1){
                        arr.push('*');
                        arr.push(this.factor);
                }
        }
};

/**
 * Compares the sizes of this OrdSummand versus another one
 * (which is given as parameter)
 * @method isGreaterThan
 * @param {OrdSummand} otherOS The other OrdSummand, to which this object
 * will be compared.
 * @return {number} A value greater 0 if this OrdSummand is greater,
 * a value less than 0 if this ordSummand is less than otherOS and
 * the value 0 if they are equally.
 */
OrdSummand.prototype.isGreaterThan = function (otherOS){
        var cmpExp;

        if (this.getFactor() === 0 && otherOS.getFactor() > 0){
                return -1;
        }
        if (this.getFactor() > 0 && otherOS.getFactor() === 0){
                return 1;
        }
        cmpExp = Calculation.compare( this.exp, otherOS.getExponent() );

        if (cmpExp > 0){
                return 1;
        }
        if (cmpExp < 0){
                return -1;
        }
        // exponents are equal: let factors decide...
        return Calculation.compare( this.getFactor(), otherOS.getFactor() );
};