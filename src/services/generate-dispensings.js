const dispensings = [];

function randomDispensing(id) {
  const machineId = Math.floor(Math.random() * 6) + 1;
  const recipeId = Math.floor(Math.random() * 12) + 1;

  const dispensing = {
    id, machineId, recipeId, 
    localDate: randomDate(
      new Date(2023, 9, 1),
      new Date(2023, 9, 17),
      8,
      23
    ),
    cupSize: "Regular",
    status: "completed",
  }
  dispensings.push(dispensing);
}

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

for (let i = 0; i < 427; i++) {
  id = 1000 + i;
  randomDispensing(id);
}
console.log(JSON.stringify(dispensings, null, 2));