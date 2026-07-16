const button = document.querySelector("#generateButton");
const promptBox = document.querySelector("#prompt");
const result = document.querySelector("#result");

button.addEventListener("click", async function () {

    const userPrompt = promptBox.value;

    if (userPrompt.trim() === "") {

        result.innerHTML = "Please describe yourself first!";
        return;

    }


    result.innerHTML = `

        <div class="loading">

            🚀 Creating your business idea...

            <br><br>

            🤖 AI founder is thinking...

        </div>

    `;


    try {

        const response = await fetch("/api/generate", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                prompt: userPrompt

            })

        });



        const data = await response.json();



        // Create business score

        let score = Math.floor(Math.random() * (95 - 70 + 1)) + 70;


        const scoreMatch = data.idea.match(/(\d+)\/100/);


        if (scoreMatch) {

            score = parseInt(scoreMatch[1]);

        }




        result.innerHTML = `


            <h2>🚀 Your Business Idea</h2>


            <div class="idea-box">


                <h3>

                    🔥 Business Potential Score:

                    <span id="scoreNumber">0</span>/100

                </h3>



                <div class="score-container">

                    <div 
                    class="score-fill" 
                    id="scoreFill"
                    style="width:${score}%">

                    </div>

                </div>




                <div id="ideaText">

                    ${data.idea.replace(/\n/g, "<br>")}

                </div>


            </div>




            <br>



            <button id="improveButton">

                🚀 Improve Idea

            </button>



            <button id="regenerateButton">

                🔄 New Idea

            </button>



            <button id="copyButton">

                📋 Copy Idea

            </button>



            <button id="shareButton">

                📤 Share Idea

            </button>



            <button id="printButton">

                📄 Save Business Plan

            </button>


        `;




        // SCORE COUNTER

        let currentScore = 0;



        const counter = setInterval(() => {


            currentScore++;


            const number = document.getElementById("scoreNumber");


            if (number) {

                number.innerHTML = currentScore;

            }



            if (currentScore >= score) {

                clearInterval(counter);

            }


        }, 15);






        // COPY BUTTON

        document.querySelector("#copyButton").onclick = () => {


            navigator.clipboard.writeText(data.idea);


            alert("Business idea copied!");


        };







        // SHARE BUTTON

        document.querySelector("#shareButton").onclick = () => {


            if (navigator.share) {


                navigator.share({

                    title: "My AI Business Idea",

                    text: data.idea

                });


            } else {


                alert("Sharing is not supported on this device.");


            }


        };







        // PRINT BUTTON

        document.querySelector("#printButton").onclick = () => {


            window.print();


        };







        // NEW IDEA BUTTON

        document.querySelector("#regenerateButton").onclick = () => {


            button.click();


        };







        // IMPROVE BUTTON

        document.querySelector("#improveButton").onclick = async () => {



            result.innerHTML = `

                <div class="loading">

                    🚀 Improving your business...

                </div>

            `;



            const improveResponse = await fetch("/api/improve", {


                method: "POST",


                headers: {


                    "Content-Type": "application/json"


                },


                body: JSON.stringify({


                    idea: data.idea


                })


            });





            const improved = await improveResponse.json();





            result.innerHTML = `


                <h2>🚀 Improved Business</h2>


                <div class="idea-box">

                    ${improved.improved.replace(/\n/g, "<br>")}

                </div>



                <br>


                <button onclick="window.location.reload()">


                    🔄 Start Over


                </button>


            `;


        };





    } catch (error) {



        console.log(error);



        result.innerHTML = `


            ❌ Something went wrong.


            <br><br>


            Please try again.


        `;


    }


});