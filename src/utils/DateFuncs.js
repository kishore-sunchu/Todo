export function date() {
  var today = new Date();
  let date = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  let year = today.getFullYear();
  let todayDate = date + ", " + month + " " + year;
  return todayDate;
}

console.log(date());
