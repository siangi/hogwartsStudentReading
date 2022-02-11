const Person = {
    firstname: "",
    lastname: "",
    middlename: "",
    nickname: "",
    filename: "",
    house: ""
}

let peopleObjects  = [];

window.onload = () => {
    loadActorList("loadingCleaning/students.json")
        .then(people => {
            createPeopleList(people);
        });
}

async function loadActorList(url){
    const response = await fetch(url, { mode: 'no-cors'})
        .then(data => { return data.json()} );
    
    return response;
}

function createPeopleList(jsonPeople){
    jsonPeople.forEach(jsonObj => {
        let person = Object.create(Person);
        fillNames(jsonObj.fullname.trim(), person)
        person.house = capitalStartRestSmall(jsonObj.house);
        person.filename = getImagePath(person.lastname, person.firstname);
        peopleObjects.push(person);
    });

    console.table(jsonPeople);
    console.table(peopleObjects);
}

function getImagePath(lastname, firstname){
    return `..\..\resources\images\\${lastname.toLowerCase()}_${firstname.substring(0, 1).toLowerCase()}.png`
}

function fillNames(fullname, personToFill){
    let withoutNickname = fullname;

    if (fullname.includes('"')){
        let startIdx = fullname.indexOf('"');
        let endIdx = fullname.indexOf('"', startIdx + 1);
        personToFill.nickname = capitalStartRestSmall(fullname.substring(startIdx +  1, endIdx));
        withoutNickname = fullname.substring(0, startIdx) + fullname.substring(endIdx + 1, fullname.length);
    }

    let namesArr = withoutNickname.split(" ");
    personToFill.firstname = capitalStartRestSmall(namesArr[0]);

    // add middle names in a loop, because there can be multiple
    // skip first an lastname
    for(i = 1; i < namesArr.length -2; i++){
        personToFill.middlename += ` ${capitalStartRestSmall(namesArr[i])}`
    }
    personToFill.middlename.trim()
    personToFill.lastname = capitalStartRestSmall(namesArr[namesArr.length - 1])

    return personToFill;
}

function capitalStartRestSmall(fullname){
    let trimmed = fullname.trim();
    return trimmed.substring(0,1).toUpperCase() + trimmed.substring(1, trimmed.length).toLowerCase();
}

