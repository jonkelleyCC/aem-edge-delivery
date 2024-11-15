export default function decorate(block) {
  const question = block.querySelector("[data-aue-prop='question']");
  const answer = block.querySelector("[data-aue-prop='answer']");

  if (question) question.classList.add('faq__question');
  if (answer) answer.classList.add('faq__answer');
}
