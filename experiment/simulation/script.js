// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // --- HELPERS ---
  const elementId = (id) => document.getElementById(id);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // --- ELEMENT SELECTORS ---
  const introOverlay = elementId("introOverlay");
  const btnStart = elementId("btnStartExperiment");
  const elementLabel = elementId("elementLabel");
  let dropVolume = 0;

  const butterSlice = elementId("butter-slice");
  const butterSlice1 = elementId("butter-slice-1");
  const butter = elementId("butter-block");
  const knife = elementId("knife");
  const plate = elementId("plate");
  const flask = elementId("flask");
  const spatula = elementId("spatula");
  const bottleSoltiuonPouring = elementId("bottleSolutionPouringImage");
  const ethylAlcohol = elementId("EthylAlcohol");
  const ethylAlcoholSolution = elementId("EthylAlcoholSolutionImage");
  const ammonia = elementId("Ammonia");
  const petroleumEtherImage = elementId("PetroleumEtherImage");
  const ammoniaSolution = elementId("AmmoniaSolutionImage");
  const diethylEther = elementId("Diethyl-Ether");
  const diethylEtherSolution = elementId("DiethylEtherSolutionImage");
  const petroleumEther = elementId("Petroleum-Ether");
  const petroleumEtherSolution = elementId("PetroleumEtherSolutionImage");
  const buretteNozzel = elementId("buretteNozzel");
  const burette = elementId("burette");
  const buretteSolution = elementId("buretteSolution");
  const porcelainDishSolution = elementId("porcelainDishSolutionImage");
  const pipetteDiEthylEther = elementId("diethylEtherSolution");
  const drop = elementId("drop");
  const drop1 = elementId("drop1");
  const pipettePouring = elementId("pouring");
  const pouringButter = elementId("pouringButter");
  const pipette = elementId("pipette");
  const waterBath = elementId("waterBathWrapper");
  const stand = elementId("stand");
  const separatingFunnel = elementId("separatingFunnel");
  const weightingMachineWrapper = elementId("weightingMachineWrapper");
  const weightingMachine = elementId("weightingMachine");
  const porcelainDish = elementId("porcelainDish");
  const butterMelted = elementId("butterMelted");
  const flaskButter = elementId("flaskButter");

  const weightingPower = elementId("power");
  const weightingMachineScreen = elementId("screen");
  const weightingMachineTare = elementId("tare");
  const cylinderSolution = elementId("cylinderSolution");
  const cylinderPouring = elementId("pouringCylinder");
  const measuringCylinder = elementId("cylinder50ml");
  const naohUsed = elementId("naohStatus");
  console.log("NAOH Status Element:", naohUsed);
  const waterBathPower = elementId("waterBathPower");
  const waterBathScreen = elementId("waterBathScreen");
  const tempUp = elementId("tempUp");
  const tempDown = elementId("tempDown");
  const waterBathTimer = elementId("waterBathTimer");
  const waterBathStart = elementId("waterBathStart");
  const tempBtn = elementId("tempBtn");
  // ===== FORMULA TOGGLE LOGIC =====
const formulaButton = document.getElementById("formulaButton");
const formulaBox = document.querySelector(".formula-box");
let calResult = 0;

let formulaOpen = false;

if (formulaButton && formulaBox) {
  formulaButton.addEventListener("click", () => {
    formulaOpen = !formulaOpen;
    formulaBox.style.display = formulaOpen ? "block" : "none";
    formulaButton.innerText = formulaOpen ? "Hide Formula" : "Show Formula";
  });
}

const result = document.getElementById("result");
const finalResult = document.getElementsByClassName("final-result")[0];
let resultOpen = false;


if (result && finalResult) {
  
  result.addEventListener("click", () => {
    if(resultOpen){
    finalResult.style.display = "block";
    document.getElementById("calcResult").innerText =`Result: ${calResult.toFixed(3)} % FFA`;
  }
    else{
       finalResult.style.display = "none";
    }
    resultOpen = !resultOpen;
  })};
    

// ===== ANSWER CHECK LOGIC =====
const checkBtn = document.getElementById("checkBtn");
const userAnswer = document.getElementById("userAnswer");

// You already use these values in showCalculation()
// const CORRECT_V = dropVolume;
// // /const CORRECT_V = 3.5; // Example correct volume in mL
// const N = 0.1;
// const W = 5.0;
// const FACTOR = 0.282;

const answerCheck = document.getElementById("answerCheck");
const wrongText = document.getElementById("wrongText");
const rightText = document.getElementById("rightText");

const N = 0.1;
const W = 5.0;
const FACTOR = 0.282;
const tolerance = 0.01;

if (checkBtn) {
  checkBtn.addEventListener("click", () => {

    const studentValue = parseFloat(userAnswer.value);
    const correctAnswer = ((dropVolume * N * FACTOR) / W) * 100;

    if (isNaN(studentValue)) {
      return;
    }

    // Remove previous highlights
    wrongText.classList.remove("highlight");
    rightText.classList.remove("highlight");

    if (Math.abs(studentValue - correctAnswer) <= tolerance) {
      rightText.classList.add("highlight");
    } else {
      wrongText.classList.add("highlight");
    }

  });
}

  // const mmBtn = elementId("mm");
  // const ssBtn = elementId("ss");
  
  const waterBathCurrentTemp = elementId("waterBathCurrentTemp");
  const waterBathSetTemp = elementId("waterBathSetTemp");
  let bathTimerInterval = null;
let bathTimeRemaining = 180; // seconds (3 minutes)



  
  const next1 = document.querySelector(".next");
  const next2 = document.querySelector(".next2");
  const next3 = document.querySelector(".next3");
  const next4 = document.querySelector(".next4");
  const btnNext0 = elementId("btnNext");
  const btnNext2 = elementId("btnNext2");
  const btnNext3 = elementId("btnNext3");
  const btnNext4 = elementId("btnNext4");
  const butterUsed = elementId("butterStatus");

  // --- STATE ---
  let experimentStep = -1; // Locked initially for Intro
  let isON = false;
  let isTareOn = false;
  let isWaterBathOn = false;
  let currentTemp = 25;
  let setTemp = 0;
  let heatingInterval = null;
  let timerMinutes = 0;
  let timerSeconds = 0;
  let activeMode = "temp";
  let timerInterval = null;
  let dropCount = 0;
  let isDropping = false;
  let buretteDropCount = 0; // Added for Titration logic
let buretteOpen = false;
let buretteInterval = null;


  // --- WATER BATH SCREEN UPDATE ---
function updateWaterBathScreen() {
  if (!isWaterBathOn) {
    waterBathCurrentTemp.innerText = "--°C";
    waterBathSetTemp.innerText = "SET: --°C";
    currentTemp = 25;
    setTemp = 0;
    return;
  }

  waterBathCurrentTemp.innerText = `${currentTemp}°C`;
  waterBathSetTemp.innerText = `SET: ${setTemp}°C`;
}



  function updateSidebarProgress(currentStep) {
  const stepItems = document.querySelectorAll("#stepList li");
  stepItems.forEach((li) => {
    const stepNum = Number(li.getAttribute("data-step"));
    if (isNaN(stepNum)) return;
    li.classList.toggle("completed", stepNum < currentStep);
    li.classList.toggle("current", stepNum === currentStep);
  });
}

function updateInstruction(step) {
    const stepBox = document.querySelector(".stepBox");
    if (!stepBox) return;

    let msg = "";
    switch (step) {

      case 0: msg = "Hover over the instruments to familiarize yourself with the setup."; break;
      case 1: msg = "Click the knife to cut a butter slice."; break;
      case 2: msg = "Turn on the Weighing Machine."; break;
      case 3: msg = "Click the Empty Flask to weigh it."; break;
      case 4: msg = " Click 'Tare' to reset weight to 0.00g."; break;
      case 5: msg = "Click the Spatula to add butter to the flask."; break;
      case 6: msg = "Click the Flask to take it out of the weighting machine."; break;
      case 7: msg = "Click 'Next' (Bottom Right) to proceed."; break;
      case 8: msg = "Click on the Neutralized Ethanol to add 50ml of it in the flask."; break;
      case 9: msg = "Click 'Next' (Bottom Right) to proceed."; break;
      case 10: msg = "Click Flask to move to Water Bath."; break;
      case 11: msg = "Set Temp 50°C, Timer 1m, then Start."; break;
      case 12: msg = "Click 'Next' (Bottom Right) to proceed"; break;
      case 13: msg = "Click Pipette to add Phenolphthalein."; break;
      case 14: msg = "Click Pipette to add drops."; break;
      case 15: msg = "Drops added. Click Pipette to move it aside."; break;
      case 16: msg = "Click 'Next' (Bottom Right) to proceed."; break;
      case 17: msg = "Click Flask to place under Burette."; break;
      case 18: msg = "Click the burette nozzle to start/stop titration drops."; break;
      case 19: msg = "Click 'Observation' to view the calculation table."; break;
      default: msg = "Follow the on-screen procedures.";
    }
    stepBox.innerHTML = `<span style="color: rgb(187, 4, 4);">Instruction:</span> ${msg}`;
    updateSidebarProgress(step);
  }

  // Initialize with the first instruction (step 0) before the user starts
  experimentStep = 0;
  updateInstruction(0);

  const stepToggleBtn = document.getElementById("stepToggleBtn");
  const stepSidebar = document.getElementById("stepSidebar");

  if (stepToggleBtn) {
    stepToggleBtn.addEventListener("click", () => {
      if (stepSidebar) stepSidebar.classList.toggle("open");
    });
  }

  // --- DEBUG STEP JUMP (NO CONSOLE REQUIRED) ---
window.jumpToStep = function(step) {

  // Unlock everything
  isDropping = false;

  // Make sure core elements exist
  flask.style.display = "block";
  butterMelted.style.display = "block";
  diethylEther.style.display = "block";

  // Hide Next buttons
  if (next1) next1.style.display = "none";
  if (next2) next2.style.display = "none";
  if (next3) next3.style.display = "none";
  if (next4) next4.style.display = "none";

  experimentStep = step;
  updateInstruction(step);
};


  // Start button — instant reveal, no intro animation
  const startExperimentBtn = document.getElementById("startExperimentBtn");
  if (startExperimentBtn) {
    startExperimentBtn.addEventListener("click", () => {
      startExperimentBtn.style.display = "none";
      // Reveal only the initial instruments needed for step 1
      ["butter-block", "knife", "plate", "flask", "spatula", "weightingMachineWrapper"]
        .forEach(id => {
          const el = document.getElementById(id);
          if (el) el.style.display = "block";
        });
      experimentStep = 1;
      updateInstruction(1);
    });
  }

  async function runIntroductionSequence() {
    const introSequence = [
      { id: "butter-block", text: "Butter Sample" },
      { id: "knife", text: "Knife" },
      { id: "plate", text: "Porcelain Plate" },
      { id: "flask", text: "Conical Flask" },
      { id: "spatula", text: "Spatula" },
      { id: "weightingMachineWrapper", text: "Digital Balance" },
    ];

    for (const item of introSequence) {
      const el = elementId(item.id);
      if (!el || getComputedStyle(el).display === "none") continue;

      el.classList.add("intro-highlight");

      if (elementLabel) {
        const rect = el.getBoundingClientRect();
        const containerRect = elementId("container").getBoundingClientRect();
        const offsetTop = rect.top - containerRect.top;
        const offsetLeft = rect.left - containerRect.left;
        const labelTop = offsetTop - 40;
        const labelLeft = offsetLeft + rect.width / 2;

        elementLabel.style.top = `${labelTop}px`;
        elementLabel.style.left = `${labelLeft}px`;
        elementLabel.style.transform = "translateX(-50%)";
        elementLabel.innerText = item.text;
        elementLabel.classList.remove("label-hidden");
        elementLabel.classList.add("label-visible");
      }

      await wait(1500);

      el.classList.remove("intro-highlight");
      if (elementLabel) {
        elementLabel.classList.remove("label-visible");
        elementLabel.classList.add("label-hidden");
      }
      await wait(200);
    }
  }

  // --- 2. EXPERIMENT LOGIC ---

  knife.addEventListener("click", async () => {
    if (experimentStep !== 1) return;
    experimentStep = -1; // Lock

    knife.style.top = "50%";
    knife.style.left = "60%";
    await wait(1000);
    knife.style.top = "74%";
    await wait(600);
    butter.style.width = "10%";
    butterSlice.style.display = "block";
    await wait(1000);
    knife.style.top = "50%";
    await wait(1000);
    knife.style.left = "80%";
    await wait(1000);
    knife.style.top = "75%";
    console.log("Step 1 Complete: Butter sliced");  
    butterUsed.innerText="5 gram";
    experimentStep = 2; // Next: Power Machine
    updateInstruction(2);
  });

  weightingPower.addEventListener("click", () => {
    if (experimentStep === 2) {
      weightingMachineScreen.innerText = "0.00g";
      experimentStep = 3; // Next: Place Empty Flask
      updateInstruction(3);
      console.log("Step 2 Complete: Machine On. Next: Place Flask (Step 3)");
    }
  });

  // --- FLASK LISTENER ---
  flask.addEventListener("click", async () => {
    const originalTop = "55%";
    const originalLeft = "40%";

    // STEP 3: Move Empty Flask to Machine
    if (experimentStep === 3) {
      console.log("flask step", experimentStep);
      experimentStep = -1; // Lock

      flask.style.top = "22.5%";
      await wait(1000);
      flask.style.left = "11%";
      await wait(1000);

      // Value from your logic: calc(69% - 18vw)
      flask.style.top = "calc(69% - 18vw)";

      await wait(1000);
      weightingMachineScreen.innerText = "250.00g";
      console.log("Step 3 Complete: Empty Flask Weighed");

      experimentStep = 4; // Next: Tare
      updateInstruction(4);
    }
    // STEP 6: Move Flask + Butter
    else if (experimentStep === 6) {
      console.log("flask step", experimentStep);
      experimentStep = -1; // Lock

      // Lift both
      flask.style.top = "10.5%";
      butterSlice.style.top = "43.5%";
      await wait(1000);

      // Move both
      flask.style.left = "40%";
      butterSlice.style.left = "43.6%";
      await wait(1000);

      // Drop - Values from your logic
      flask.style.top = "calc(90% - 18vw)";
      butterSlice.style.top = "83.6%";

      await wait(1000);
      console.log("Step 6 Complete: Filled Flask Weighed");
      next1.style.display="block";

      experimentStep = 7; // Next: Move to Water Bath
      updateInstruction(7);
    }
    // STEP 7 (Labeled 10 in logic for water bath)
    else if (experimentStep === 11) {
      console.log("flask step for the waterBath", experimentStep);
      experimentStep = -1; // Lock
      flask.style.top = "-7%";
      butterSlice.style.top = "25%";
      await wait(1000);
      flask.style.left = "11%";
      butterSlice.style.left = "14.7%";
      await wait(1000);
      flask.style.top = "21.5%";
      butterSlice.style.top = "53.5%";
      console.log("Step 10 Complete: Flask in Water Bath");
     
      experimentStep = 12; // Next: Start Water Bath
      updateInstruction(11);
    }
    // STEP 9: Move Melted Flask to Funnel Area
    else if (experimentStep === 9) {
      console.log("flask step", experimentStep);
      experimentStep = -1; // Lock
      flask.style.top = "20%";
      await wait(1000);
      flask.style.left = "25%";
      flask.style.transform = "rotate(-110deg)";
      await wait(1000);

      flaskButter.style.display = "block";
      flaskButter.classList.add("butterFlaskFilling");
      await wait(2000);

      flaskButter.classList.remove("butterFlaskFilling");
      flask.style.transform = "rotate(-120deg)";
      butterMelted.classList.add("reducing1");
      await wait(20);

      flaskButter.classList.add("reducingButter");
      pouringButter.style.display = "block";
      pouringButter.style.animationDuration = "2s";
      pouringButter.classList.add("reducing1");

      await wait(3000);

      // Reset
      flask.style.top = originalTop;
      flask.style.left = originalLeft;
      flask.style.transform = "rotate(0deg)";
      butterSlice.style.display = "none";
      console.log("Step 9 Complete: Butter Poured");

      experimentStep = 10; // Next: Add Diethyl Ether
      updateInstruction(10);
    }
    // STEP 17: Move to Burette (Values from your logic)
    else if (experimentStep === 17) {
      console.log("Step 17: Scaling and Moving Flask under Burette");
      experimentStep = -1; // Lock UI

      // 1. Scale Down
      flask.style.transform = "scale(0.6)";
      flask.style.zIndex = 28;
      await wait(800);

      // 2. Move to position (Under Burette)
      flask.style.top = "55%";
      await wait(900);
      flask.style.left = "12%";

      // Wait for animation
      await wait(1000);
      flask.style.top = "48%";

      // Unlock next step (Titration)
      experimentStep = 18;
      updateInstruction(18);
    }
  });

  weightingMachineTare.addEventListener("click", () => {
    if (experimentStep === 4) {
      weightingMachineScreen.innerText = "0.00g";
      experimentStep = 5; // Next: Spatula
      updateInstruction(5);
      console.log("Step 4 Complete: Tare Pressed");
    }
  });

  spatula.addEventListener("click", async () => {
    if (experimentStep !== 5) return;
    experimentStep = -1; // Lock

    const originalTop = "85%";
    const originalLeft = "5%";

    spatula.style.top = "40%";
    await wait(1000);
    spatula.style.left = "68.4%";
    await wait(1000);
    spatula.style.top = "72%";
    spatula.style.transform = "rotate(-30deg)";
    await wait(1000);

    butterSlice.style.height = "6%";
    butterSlice1.style.display = "none";
    spatula.style.top = "25%";
    spatula.style.transform = "rotate(0deg)";
    butterSlice.style.top = "23%";
    await wait(1000);

    spatula.style.left = "14.7%";
    butterSlice.style.left = "14.7%";
    await wait(1000);

    spatula.style.top = "25%";
    butterSlice.style.top = "23%";
    spatula.style.transform = "rotate(-10deg)";
    await wait(300);

    butterSlice.style.zIndex = 10;
    butterSlice.style.top = "63%"; // Inside flask on machine

    await wait(1000);
    weightingMachineScreen.innerText = "5.00g";

    // Reset Spatula
    spatula.style.transform = "rotate(0deg)";
    await wait(1000);
    spatula.style.left = originalLeft;
    await wait(1000);
    spatula.style.top = originalTop;

    console.log("Step 5 Complete: Butter Added");
    experimentStep = 6; // Next: Weigh Filled Flask
    
    updateInstruction(6);
  });
  waterBathPower.addEventListener("click", () => {
  isWaterBathOn = !isWaterBathOn;

  if (isWaterBathOn) {
    currentTemp = 25; // room temp on power ON
    waterBathPower.style.backgroundColor = "green";
  } else {
    waterBathPower.style.backgroundColor = "red";

    if (heatingInterval) {
      clearInterval(heatingInterval);
      heatingInterval = null;
    }
  }

  updateWaterBathScreen();
});
tempUp.addEventListener("click", () => {
  if (!isWaterBathOn) return;

  if (setTemp < 100) {
    setTemp++;
    updateWaterBathScreen(); // 🔴 THIS WAS MISSING
  }
});

tempDown.addEventListener("click", () => {
  if (!isWaterBathOn) return;

  if (setTemp > 25) {
    setTemp--;
    updateWaterBathScreen(); // 🔴 THIS WAS MISSING
  }
});

waterBathStart.addEventListener("click", async () => {
  if (experimentStep !== 12) return;

  if (!isWaterBathOn) {
    alert("Please turn on the water bath.");
    return;
  }

  if (setTemp !== 50) {
    alert("Please set the temperature to 50°C.");
    return;
  }

  experimentStep = -1; // lock

  /* ===== HEAT UNTIL SET TEMP ===== */
  if (!heatingInterval) {
    heatingInterval = setInterval(async() => {
      if (currentTemp < setTemp) {
        currentTemp++;
        updateWaterBathScreen();
      } 
      else {
        clearInterval(heatingInterval);
        heatingInterval = null;
        console.log("Water bath reached 50°C");

        // 🔥🔥🔥 **START MELTING IMMEDIATELY HERE** 🔥🔥🔥
        await wait(500);
        butterSlice.classList.add("reducing1");
        butterMelted.style.display = "block";
      
       

        butterMelted.classList.add("filling");
        await wait(1000);
        butterSlice.style.display = "none";
         butterMelted.src = "./images/flaskButterWaterBath.png";
      }
    }, 200);
  }

  // Wait until 50°C is reached
  while (currentTemp < setTemp) {
    await wait(300);
  }

  /* ===== SHOW & START 3-MIN TIMER (AFTER TEMP REACHED) ===== */
  const timerBox = document.getElementById("waterBathCountdown");
  const timeDisplay = document.getElementById("waterBathTime");
  timerBox.classList.remove("hidden");

  bathTimeRemaining = 60
  if (timeDisplay) timeDisplay.innerText = "00:00";

  bathTimerInterval = setInterval(() => {
    bathTimeRemaining--;

    const min = String(Math.floor(bathTimeRemaining / 60)).padStart(2, "0");
    const sec = String(bathTimeRemaining % 60).padStart(2, "0");

    if (timeDisplay) timeDisplay.innerText = `${min}:${sec}`;

    if (bathTimeRemaining <= 0) {
      clearInterval(bathTimerInterval);
      bathTimerInterval = null;
      timerBox.classList.add("hidden");

      console.log("Water bath completed (1 minute reached)");

      // 🔽 Now STOP melting and continue experiment
      setTimeout(async () => {
        butterSlice.classList.remove("reducing1");
        butterMelted.classList.remove("filling");

        // await wait(3000);
       
        flask.style.top = "-10%";
        await wait(1000);
        flask.style.left = "40%";
        await wait(1000);
        flask.style.top = "55%";

        experimentStep = 13;
        next3.style.display = "block";
        
        updateInstruction(12);
      }, 5);
    }
  }, 100);
});



  diethylEther.addEventListener("click", async () => {


    
    if (experimentStep === 9) {
    experimentStep = -1; // Lock

    diethylEther.style.top = "5%";
    await wait(1000);
    diethylEther.style.left = "44%";
    await wait(1000);
    diethylEther.style.top = "calc(67% - 18vw)";
    diethylEther.style.transform = "rotate(-90deg)";
    await wait(1000);
    diethylEther.style.transform = "rotate(-100deg)";
    await wait(2000);

    if (diethylEtherSolution) diethylEtherSolution.classList.add("reducing1");
    if (bottleSoltiuonPouring) {
      bottleSoltiuonPouring.style.display = "block";
      bottleSoltiuonPouring.classList.add("reducing2");
    }

    await wait(1200);

    if (pouring) {
      pouring.style.display = "block";
      pouring.classList.add("pouring-animation");
    }

    await wait(500);
    bottleSoltiuonPouring.classList.remove("reducing2");
    void bottleSoltiuonPouring.offsetWidth;
    bottleSoltiuonPouring.classList.add("reverseReducing");

    if (butterMelted) {
      butterMelted.style.display = "block";
      butterMelted.classList.add("filling");
    }
    await wait(2000);

    diethylEther.style.transform = "rotate(0deg)";
    diethylEther.style.top = "40%";
    diethylEther.style.left = "65%";

    console.log("Step 9 Complete: Diethyl Ether Added");
   
    experimentStep = 10;
    updateInstruction(9);
  } 
  else if(experimentStep === 8){
    console.log("experiment step for pouring inside 50ml")
    experimentStep = -1;
    
    diethylEther.style.top = "5%";
    await wait(1000);
    diethylEther.style.left = "62%";
    await wait(1000);
    diethylEther.style.top = "calc(72% - 18vw)";
    diethylEther.style.transform = "rotate(-90deg)";
    await wait(1000);
    diethylEther.style.transform = "rotate(-100deg)";
    await wait(2000);

    if (diethylEtherSolution) diethylEtherSolution.classList.add("reducing1");
    if (bottleSoltiuonPouring) {
      bottleSoltiuonPouring.style.display = "block";
      bottleSoltiuonPouring.classList.add("reducing2");
    }

    await wait(1200);

    if (cylinderPouring) {
      cylinderPouring.style.display = "block";
      cylinderPouring.classList.add("pouring-animation");
    }

    await wait(500);
    bottleSoltiuonPouring.classList.remove("reducing2");
    void bottleSoltiuonPouring.offsetWidth;
    bottleSoltiuonPouring.classList.add("reverseReducing");

    if (butterMelted) {
      cylinderSolution.style.display = "block";
    cylinderSolution.classList.add("filling");
    }
    await wait(2000);

    diethylEther.style.transform = "rotate(0deg)";
    diethylEther.style.top = "40%";
    diethylEther.style.left = "75%";

    console.log("Step 8 Complete: Diethyl Ether Added");
    // next2.style.display="block";
    experimentStep = 9;
    updateInstruction(9);
  }

    
  });

  measuringCylinder.addEventListener("click", async () =>{

    if(experimentStep === 9){
      cylinderSolution.style.display="block";
      experimentStep = -2;

      measuringCylinder.style.top="20%";
      await wait(1000);
      measuringCylinder.style.left="48.5%";
      await wait(1000);
      measuringCylinder.style.top="32%";
      measuringCylinder.style.transform = "rotate(-98deg)";
      await wait(1000);
      cylinderSolution.classList.add("reducing1");
    
    if (bottleSoltiuonPouring) {
      bottleSoltiuonPouring.style.display = "block";
      bottleSoltiuonPouring.classList.add("reducing2");
    }

    // await wait(500);

    if (pouring) {
      pouring.style.display = "block";
      pouring.classList.add("pouring-animation");
    }

    await wait(500);
    bottleSoltiuonPouring.classList.remove("reducing2");
    void bottleSoltiuonPouring.offsetWidth;
    bottleSoltiuonPouring.classList.add("reverseReducing");

    if (butterMelted) {
      butterMelted.style.display = "block";
      butterMelted.classList.add("filling");
    }
    await wait(2000);
    measuringCylinder.style.transform="rotate(0deg)";
    await wait(1000);

    measuringCylinder.style.left="60%";
    await wait(1000);
    measuringCylinder.style.top="60%";
    next2.style.display="block";
    experimentStep = 10;
    updateInstruction(9);
      // measuringCylinder.style.transform = "rotate(-90deg)";
      // await wait(1500);
      //   measuringCylinder.style.left="47%";

      // measuringCylinder.style.transform = "rotate(-120deg)";



    }
    
  })

  pipette.addEventListener("click", async () => {
    pipette.style.transform = "rotate(0deg)";
    const originalTop = "72%";
    const originalLeft = "21.9%";

    // --- DROPPER LOGIC (Step 14) ---
    if (experimentStep === 15 && !isDropping) {
      isDropping = true; // Lock clicks

      // 1. Reduce Liquid Level
      if (dropCount === 0) {
        pipetteDiEthylEther.classList.add("reducingBurette1");
      } else if (dropCount === 1) {
        pipetteDiEthylEther.classList.remove("reducingBurette1");
        pipetteDiEthylEther.classList.add("reducingBurette2");
      }

      // 2. Drop Animation
      drop1.style.display = "block";
      drop1.classList.remove("drop-form", "drop-fall");
      void drop1.offsetWidth; // Force Reflow

      drop1.classList.add("drop-form");
      await wait(500);

      drop1.classList.remove("drop-form");
      drop1.classList.add("drop-fall");
      await wait(1000);

      drop1.style.display = "none";

      dropCount++;
      if (dropCount >= 2) {
        console.log("Two drops added. Moving to next step.");
        next4.style.display="block";
        experimentStep = 16;
        updateInstruction(15);
      }

      isDropping = false;
    }
    // --- STEP 15: Move Pipette Away ---
    else if (experimentStep === 16) {
      experimentStep = -1;
      pipette.style.top = "72%";
      pipette.style.left = "21%";
      pipette.style.transform = "rotate(90deg)";

      experimentStep = 17;
      updateInstruction(16);
    }
    // --- STEP 13: Reagent Logic ---
    else if (experimentStep === 14) {
      experimentStep = -1;
      pipette.style.top = "-10%";
      await wait(1000);
      pipette.style.left = "83%"; // Move over bottle
      await wait(1000);
      pipette.style.top = "40%"; // Move down to bottle
      await wait(1000);
      petroleumEtherSolution.classList.add("reducing");
      pipetteDiEthylEther.style.display = "block";
      pipetteDiEthylEther.classList.remove("filling", "reducing", "reducing1", "reducing2");
      void pipetteDiEthylEther.offsetWidth;
      pipetteDiEthylEther.classList.add("filling");
      await wait(2000);
      
      // Pour into funnel/flask
      pipette.style.top = "-10%";
      await wait(1000);
      pipette.style.left = "43%";
      await wait(1000);
      pipette.style.top = "20%";
      pipetteDiEthylEther.classList.remove("filling");
      await wait(1200);
      
      pipettePouring.style.display = "none";
      console.log(experimentStep);
      experimentStep = 15; 
      updateInstruction(14);
      console.log(experimentStep);
    }
  });

  porcelainDish.addEventListener("click", async () => {
    if (experimentStep !== 13) return;
    experimentStep = -1;
    const originalTop = "72%";
    const originalLeft = "25%";
    porcelainDish.style.top = "20%";
    await wait(1000);
    porcelainDish.style.left = "65%";
    await wait(1000);
    porcelainDish.style.top = "60%";
    await wait(2000);
    porcelainDish.style.top = "20%";
    await wait(1000);
    porcelainDish.style.left = originalLeft;
    await wait(1000);
    porcelainDish.style.top = originalTop;
    experimentStep = 14;
    updateInstruction(14);
  });

  // --- UI CONTROLS ---
  // function updateScreen() {
  //   waterBathScreen.innerText = isWaterBathOn ? `${currentTemp}°C` : "--°C";
  //   waterBathTimer.innerText = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;
  // }

  // waterBathPower.addEventListener("click", () => {
  //   isWaterBathOn = !isWaterBathOn;
  //   currentTemp = 60;
  //   timerMinutes = 0;
  //   timerSeconds = 0;
  //   if (timerInterval) clearInterval(timerInterval);
  //   waterBathPower.style.backgroundColor = isWaterBathOn ? "green" : "red";
  //   updateScreen();
  // });

  // tempBtn.addEventListener("click", () => (activeMode = "temp"));
  // mmBtn.addEventListener("click", () => (activeMode = "mm"));
  // ssBtn.addEventListener("click", () => (activeMode = "ss"));

  // tempUp.addEventListener("click", () => {
  //   if (!isWaterBathOn) return;
  //   if (activeMode === "temp" && currentTemp < 100) currentTemp++;
  //   else if (activeMode === "mm" && timerMinutes < 99) timerMinutes++;
  //   else if (activeMode === "ss" && timerSeconds < 59) timerSeconds++;
  //   updateScreen();
  // });

  // tempDown.addEventListener("click", () => {
  //   if (!isWaterBathOn) return;
  //   if (activeMode === "temp" && currentTemp > 0) currentTemp--;
  //   else if (activeMode === "mm" && timerMinutes > 0) timerMinutes--;
  //   else if (activeMode === "ss" && timerSeconds > 0) timerSeconds--;
  //   updateScreen();
  // });

  // updateScreen();

  // --- DEBUG FUNCTIONS ---
  function setupScene(step) {
    if (step === "start") {
      if (experimentStep !== 7) return;
      weightingMachine.style.display="none";
      measuringCylinder.style.display="block";
      next1.style.display="none";
      knife.style.display="none";
      butter.style.display="none";
      spatula.style.display="none";
      petroleumEther.style.display = "none";
      // stand.style.display = "block";
      waterBath.style.display = "none";
      diethylEther.style.display = "block";
      petroleumEther.style.display = "none";
      // knife.style.display = "block";
      plate.style.display = "none";
      butterSlice.style.display = "block";
      weightingMachineWrapper.style.display = "block";
      flask.style.display = "block";
      experimentStep = 8;
      updateInstruction(8);
    } 
    else if (step === "nextButton2") {
      if (experimentStep !== 10) return;
      
      next2.style.display="none";
      waterBath.style.display = "block";
      diethylEther.style.display = "none";
      petroleumEther.style.display = "none";
      knife.style.display = "none";
      flask.style.display = "block";
      butterSlice.style.display = "block";

      // Show the digital timer clock (starts when water bath begins)
      const timerBox = document.getElementById("waterBathCountdown");
      const timeDisplay = document.getElementById("waterBathTime");
      if (timerBox) {
        timerBox.classList.remove("hidden");
        if (timeDisplay) timeDisplay.innerText = "00:00";
      }

      experimentStep = 11;
      updateInstruction(10);
    } 
    else if (step === "12") {
      if (experimentStep !== 13) return;
      next3.style.display="none";
      waterBath.style.display="none"
      pipette.style.display = "block";
      // diethylEther.style.display = "block";
      petroleumEther.style.display = "block";

      // Hide the timer when leaving the water bath stage
      const timerBox = document.getElementById("waterBathCountdown");
      if (timerBox) timerBox.classList.add("hidden");

      experimentStep = 14;
      updateInstruction(13);
      console.log(experimentStep);
    } 
    else if (step === "nextButton4") {
      // Direct testing enabled as per your Step 17 requirement
      experimentStep = -1;
      pipetteDiEthylEther.style.display="none";
      pipette.style.display="none";
      next4.style.display="none";
      weightingMachine.style.display="none";
      stand.style.display = "block";
      burette.style.display = "block";
      buretteSolution.style.display = "block";
      buretteNozzel.style.display = "block";
      flask.style.display = "block";
      
      // Default position before Step 17 animation
      flask.style.top = "55%";
      flask.style.left = "40%";
      flask.style.transform = "scale(1)";

      experimentStep = 17;
      updateInstruction(17);
    }
  }
  console.log(btnNext0,"btnNext0");
  if (btnNext3) btnNext3.addEventListener("click", () => setupScene("12"));
  if (btnNext0) btnNext0.addEventListener("click", () => setupScene("start"));
  if (btnNext2) btnNext2.addEventListener("click", () => setupScene("nextButton2"));
  if (btnNext4) btnNext4.addEventListener("click", () => setupScene("nextButton4"));

  const observationContainer = document.querySelector(".observation");
  const observationBtn = elementId("observationBtn");
  if (observationContainer) {
    observationContainer.style.display = "none";
  }

  if (observationBtn) {
    observationBtn.addEventListener("click", () => {
      showCalculation();
      if (observationContainer) observationContainer.style.display = "none";
    });
  }

  // --- BURETTE TITRATION LOGIC (CORRECTED) ---
  if (buretteNozzel) {
    buretteNozzel.addEventListener("click", async () => {
      // Only allow during titration step
      if (experimentStep !== 18) return;

      /* ======================
         OPEN BURETTE
      ======================= */
      if (!buretteOpen) {
        buretteOpen = true;
        buretteNozzel.style.transform = "rotate(60deg)";
        console.log("Burette opened");

        buretteInterval = setInterval(async () => {
          if (isDropping) return;
          isDropping = true;

          // DROP animation
          drop.style.display = "block";
          drop.classList.remove("drop-form", "drop-fall");
          void drop.offsetWidth;

          drop.classList.add("drop-form");
          await wait(300);

          drop.classList.remove("drop-form");
          drop.classList.add("drop-fall");
          await wait(800);

          drop.style.display = "none";
          dropVolume += 2.5;
          buretteDropCount++;
          naohUsed.innerText = `${buretteDropCount * 2.5} ml`;
          console.log(`Drop count: ${buretteDropCount}`);

          // ENDPOINT (ONLY VISUAL + CALC, NO STOP)
          if (buretteDropCount === 3) {
            console.log("Endpoint reached (color change)");

            if (butterMelted) {
              butterMelted.style.filter =
                "hue-rotate(270deg) saturate(3)";
            }

            await wait(800);

            updateInstruction(19);
          }

          isDropping = false;
        }, 1200); // continuous flow
      }

      /* ======================
         CLOSE BURETTE (MANUAL)
      ======================= */
      else {
        buretteOpen = false;
        buretteNozzel.style.transform = "rotate(0deg)";
        console.log("Burette closed manually");

        if (buretteInterval) {
          clearInterval(buretteInterval);
          buretteInterval = null;
        }

        // Show observation button for the student to view results
        if (observationContainer) {
          observationContainer.style.display = "block";
        }
      }
    });
  }


  // --- SHOW CALCULATION MODAL FUNCTION ---
//   function showCalculation() {
//   console.log("SHOW CALC FUNCTION TRIGGERED!");

//   // --- ENSURE MODAL EXISTS ---
//   let modal = document.getElementById("calcModal");

//   if (!modal) {
//     modal = document.createElement("div");
//     modal.id = "calcModal";
//     modal.classList.add("calcModal");
//     modal.style.position = "fixed";
//     modal.style.top = "0";
//     modal.style.left = "0";
//     modal.style.width = "100%";
//     modal.style.height = "100%";
//     modal.style.background = "rgba(0,0,0,0.5)";
//     modal.style.display = "flex";
//     modal.style.justifyContent = "center";
//     modal.style.alignItems = "center";
//     modal.style.zIndex = "5000";

//     modal.innerHTML = `
//       <div style="background:white;padding:20px;border-radius:10px;width:420px;text-align:center;">
//         <h2>Calculation</h2>
//         <p>Volume of NaOH used (V): <span id="valV">0.0</span> ml</p>

//         <div style="margin-top:15px;padding:10px;border:1px solid #bbb;">
//           <p id="calcStep1"></p>
//           <h3 id="calcResult" style="color:green;"></h3>
//         </div>

//         <button id="btnRestart"
//           style="margin-top:20px;padding:10px 20px;background:#007bff;color:white;border:none;border-radius:6px;cursor:pointer;">
//           Restart Experiment
//         </button>
//       </div>
//     `;

//     document.body.appendChild(modal);
//   }

//   // --- APPLY VALUES ---
//   let V = 2.50;   // TEMPORARY (you will update later)
//   let N = 0.1;
//   let W = 5.0;
//   let factor = 28.2;

//   let result = (V * N * factor) / W;

//   document.getElementById("valV").innerText = V.toFixed(2);
//   document.getElementById("calcStep1").innerText =
//     `${V.toFixed(2)} × 0.1 × 28.2 / 5 = ${result.toFixed(3)}`;
//   document.getElementById("calcResult").innerText =
//     `Result: ${result.toFixed(3)} % FFA`;

//   // --- SHOW MODAL ---
//   modal.style.display = "flex";

//   // --- RESTART ---
//   document.getElementById("btnRestart").onclick = () => location.reload();
// }
function showCalculation() {
  const modal = document.getElementById("calcModal");

  if (!modal) {
    console.error("calcModal not found");
    return;
  }

  // === SAMPLE VALUES (you can change later) ===
  let V = dropVolume;
  console.log("Volume V used in calculation:", V);
  let N = 0.1;
  let W = 5.0;
  let factor = 28.2;

  calResult = (V * N * factor) / W;

  // === UPDATE UI ===
  document.getElementById("valV").innerText = V.toFixed(2);
  // document.getElementById("calcStep1").innerText =`${V.toFixed(2)} × 0.1 × 28.2 / 5 = ${result.toFixed(3)}`;
  // 

  // === SHOW MODAL ===
  modal.classList.remove("modal-hidden");

  // === RESTART BUTTON ===
  document.getElementById("btnRestart").onclick = () => {
    location.reload();
  };
}


});


const startExperimentBtn = document.getElementById("startExperimentBtn");
if (startExperimentBtn) {
  startExperimentBtn.addEventListener("click", async () => {
    startExperimentBtn.style.display = "none";
    if (typeof runIntroductionSequence === "function") {
      await runIntroductionSequence();
    }
    if (typeof updateInstruction === "function") {
      experimentStep = 1;
      updateInstruction(1);
    }
  });
}

//  BODY-LEVEL TOOLTIP for butter (bypasses container overflow:hidden) 
(function() {
  const tip = document.getElementById("global-tooltip");
  if (!tip) return;

  const butterTargets = [
    { id: "butter-block",   label: "Butter Sample" },
    { id: "butter-slice-1", label: "Butter Slice"  },
  ];

  let hideTimer = null;

  function showTip(label, x, y) {
    clearTimeout(hideTimer);
    tip.textContent = label;
    tip.style.left = x + "px";
    tip.style.top  = y + "px";
    requestAnimationFrame(() => {
      const w = tip.offsetWidth;
      const h = tip.offsetHeight;
      tip.style.left = (x - w / 2) + "px";
      tip.style.top  = (y - h - 16) + "px";
      tip.classList.add("visible");
    });
  }

  function hideTip() {
    tip.classList.remove("visible");
    hideTimer = setTimeout(() => { tip.textContent = ""; }, 300);
  }

  butterTargets.forEach(function(item) {
    const el = document.getElementById(item.id);
    if (!el) return;
    el.addEventListener("mouseenter", function(e) { showTip(item.label, e.clientX, e.clientY); });
    el.addEventListener("mousemove",  function(e) { showTip(item.label, e.clientX, e.clientY); });
    el.addEventListener("mouseleave", hideTip);
  });
})();
