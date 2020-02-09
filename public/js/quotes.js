function auto_quote() {
  q = document.getElementById("quote");
  random = Math.round(Math.random() * (quotes.length - 1));
  q.innerHTML = quotes[random];
  setTimeout(auto_quote, time_q * 1000);
}
auto_quote();
