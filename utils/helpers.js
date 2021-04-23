module.exports = {
  format_date: (date) => {
    var month = new Date(date).getMonth() + 1;
    var day = new Date(date).getDate();
    var year = new Date(date).getFullYear();

    // Format date as MM/DD/YYYY
    return month + "/" + day + "/" + year;
  }
}