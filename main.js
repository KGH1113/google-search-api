const handleGPT = () => {
  const resultDiv = document.querySelector('.gpt-answer textarea');
  resultDiv.innerHTML = `
  <style>
    /* Loading styles */
    .loading {
      display: flex;
    }
  
    .loading-bar {
      height: 2px;
      width: 10px;
      margin: 0 2px;
      background-color: white;
      animation: loading 1s ease-in-out infinite;
    }
  
    .loading-bar:nth-child(1) {
      animation-delay: 0.1s;
    }
  
    .loading-bar:nth-child(2) {
      animation-delay: 0.2s;
    }
  
    .loading-bar:nth-child(3) {
      animation-delay: 0.3s;
    }
  
    .loading-bar:nth-child(4) {
      animation-delay: 0.4s;
    }
  
    @keyframes loading {
      0% {
        transform: scale(1);
      }
      20% {
        transform: scale(1, 2.5);
      }
      40% {
        transform: scale(1);
      }
    }
  </style>
  <div class="loading"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></div>
  `
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a AI that helps developers" },
        { role: "user", content: "How do I make an HTTP request in Javascript?" },
        { role: "assistant", content: "You can make an HTTP request in JavaScript by using the built-in `fetch()` API or `XMLHttpRequest`. Here is an example of making an HTTP GET request using `fetch()`: ``` fetch('https://jsonplaceholder.typicode.com/posts') .then(response => response.json()) .then(data => console.log(data)) .catch(error => console.error(error)); ``` This will fetch data from the specified URL and returns the response as JSON. You can replace the URL with any valid HTTP endpoint and customize the request method, headers, and body as needed. Alternatively, you can use the `XMLHttpRequest()` class to make HTTP requests. Here is an example: ``` const request = new XMLHttpRequest(); request.open('GET', 'https://jsonplaceholder.typicode.com/posts'); request.onload = function() { if (request.status === 200) { console.log(JSON.parse(request.response)); } else { console.error('Request failed!'); } }; request.onerror = function() { console.error('Request failed!'); }; request.send(); ``` This will open a GET request to the specified URL, and log the response to the console if the request was successful." },
        { role: "user", content: "Give me a sample html code too." }
      ],
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const result = data.choices[0].message.content;
      resultDiv.innerHTML = result;
      if (result.length < 200) {
        resultDiv.style.height = '150px';
      } else {
        resultDiv.style.height = '500px';
      }
    });
}

if (
  location.href.split("/")[2] === "www.google.com" &&
  location.href.split("/")[3].split("?")[0] === "search"
) {
  const mainDiv = document.querySelector(".GyAeWb");
  const searchWord = document.querySelector("gLFyf");
  const template = `
    <style>
      .gpt-answer {
        flex: 0 auto;
        margin-left: var(--center-abs-margin);
        width: calc(652px + var(--rhs-margin) + var(--rhs-width));
      }
      .line {
        background: #3c4043;
        height: 1px;
        width: 100%;
        margin-bottom: 40.5px;
      }
      .result-textarea {
        width: calc(652px + var(--rhs-margin) + var(--rhs-width));
      }
    </style>
    <div class="gpt-answer">
      <h4><img src="https://i.ibb.co/dDxnKpW/icon.png" alt="icon" width="20px">  Google Search GPT</h4>
      <textarea class="result-textarea"></textarea>
      <div class="line"></div>
    </div>
    `;
  mainDiv.insertAdjacentHTML("beforebegin", template);
  handleGPT();
}