export default async function removeKey(object: object, keys: Array<string>) {

    const myObject = object;

    for (let index = 0; index < keys.length; index++) {

        const key = keys[index];

        delete myObject[key];

    }

    return myObject


}