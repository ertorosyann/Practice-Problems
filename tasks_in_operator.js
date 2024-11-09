// -----------------------------------------------------------------------------------------------------------------------
// TASK 1
// -----------------------------------------------------------------------------------------------------------------------


// Write a function hasProperties that takes an object and an array of property paths 
// (e.g., ["name", "address.city", "address.zip"]) and returns an object indicating whether each property exists.
// Use the in operator to check each path and account for nested objects. For example


const obj = {
    name: "Alice",
    address: {
      city: "New York",
      zip: 10001,
      a: {
        b: 34
      }
    }
  };

function hasProperties(obj, str) {
    if (typeof obj === 'object' && (Array.isArray(obj) || obj === null)) {
        return -1;
    }
    let res = {};

    for (let element of str) {
        if (element.includes('.')) {
            let keys = element.split('.')
            let current = obj;
            let flag = true;

            for (let key of keys) {
                if (current[key]) {
                    current = current[key];
                } else {
                    flag = false;
                    break;
                }
            }
            res[element] = flag;
            
        } else {
            res[element] = element in obj;
        }  
    }
    return res;    
}
//console.log(hasProperties( obj, ["name", "address.city", "address.zip", "address.a.b"]));


// -----------------------------------------------------------------------------------------------------------------------
// TASK 2
// -----------------------------------------------------------------------------------------------------------------------



//  Implement a deepEqual function that takes two values and checks if they are deeply equal.
//  This function should handle basic types, objects, arrays, and edge cases like null, 
//  undefined, and nested structures. Unlike == or ===,
//   this function should recursively check object properties and array elements for equality. For example:


function deepEqual(obj1, obj2){
    if (obj1 === obj2) { return true; }
    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') { return false; }
    
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) { return false; }

    for (let element of keys1) {
         if(!keys2.includes(element)){ return false; }
         if (!deepEqual(obj1[element], obj2[element])) { return false; }
    }
    return true;
}
const obj1 = { a: 1, b: { c: 2, b: 10 } };
const obj2 = { a: 1, b: { c: 2, b: 10 } };
//console.log(deepEqual(obj1, obj2)); 


// -----------------------------------------------------------------------------------------------------------------------
// TASK 3
// -----------------------------------------------------------------------------------------------------------------------

//Falsy Filter
//Write a function filterFalsyValues that takes an array and returns a new array with all falsy values removed.
// This function should consider values like false, 0, "", null, undefined, and NaN as falsy, but leave truthy values intact.

function filterFalsyValues(arr) {
    if (!Array.isArray(arr)) return -1;
    return arr.filter(Boolean);
}
// console.log(filterFalsyValues([0, 1, "", "hello", null, undefined, false, 42]));

// -----------------------------------------------------------------------------------------------------------------------
// TASK 4
// -----------------------------------------------------------------------------------------------------------------------


//Truthy/Falsy Mapper
//  Create a function mapToBoolean that accepts an array of values and maps each value to
//  its boolean equivalent using !! or Boolean(). 
//  The function should return an array with the boolean values (true or false) for each element in the original array.
//  This can help understand the truthiness of different values. For example:



function mapToBoolean(arr) {
    if (!Array.isArray(arr)) return -1;
    let res = arr.reduce((res,elem) => {
        res.push(Boolean(elem));
        return res;
    },[]);

    return res;    
}
//console.log(mapToBoolean([0, "hello", "", NaN, 42, {}, []]));



// -----------------------------------------------------------------------------------------------------------------------
// TASK 5
// -----------------------------------------------------------------------------------------------------------------------

//Custom JSON Schema Validator

//Write a validateSchema function that takes an object and a schema definition,
// validating that the object conforms to the schema. The schema can specify required properties,
// types (string, number, boolean, object, array), and logical conditions 
// (e.g., minLength, maxLength for strings, min, max for numbers). 


const schema = {
    name: { type: "string", minLength: 2 , maxLength: 10},
    age: { type: "number", min: 18 },
    isActive: { type: "boolean" },
    tags: { type: "array", itemType: "string" },
};

const oBJ = { name: "Alisa", age: 25, isActive: true, tags: ["admin", "user" ] };

function validateSchema(obj, schema) {
    if (obj === null || schema === null || typeof obj !== 'object' || typeof schema !== 'object') { return false; }
    if (Object.keys(obj).length !== Object.keys(schema).length) { return false; }

    for (const key in schema) {
        let sxema = schema[key];        
        let value = obj[key];

        if (sxema.type !== typeof value) return false;
        if ((sxema.type === 'string')) {
            if (sxema.minLength && value.length < sxema.minLength ) return false;    
            if (sxema.maxLength && value.length > sxema.maxLength) return false;    
            continue;
        }
        if (sxema.type === 'number') {
            if (sxema.min && value < sxema.min) return false;
            if (sxema.max && value > sxema.max) return false;
            continue;
        }
        if (sxema.type === 'boolean') {
            if (typeof value !== 'boolean') return false;
            continue;
        }
        if (sxema.type === 'array') {
            if (Array.isArray(value)) {
                for (const element of value) {
                    if (sxema.itemType && typeof element !== sxema.itemType) return false;
                }
            }
        }
        return true;
    }
}


console.log(validateSchema(oBJ, schema)); // Expected output: true
  
// -----------------------------------------------------------------------------------------------------------------------
