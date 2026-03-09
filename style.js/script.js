let allIssuesData = [];
const allIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then((json) =>{
            allIssuesData = json.data;
            document.getElementById("issues-count").innerText = allIssuesData.length + " Issues";
             displayAllIssue(allIssuesData)});
};



const displayAllIssue = (issues) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";


    for (let issue of issues) {
        let statusIcon;

        if (issue.status === "closed") {
            statusIcon = "./assets/Closed- Status .png"
        } else {
            statusIcon = "./assets/Open-Status.png";
        }

        let borderColor;
        if (issue.status === "open") {
            borderColor = "border-[#00A96E]"
        } else {
            borderColor = "border-[#A855F7]"
        }
       
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
             <div onclick="openModal(${issue.id})"
               class="p-5 space-y-3  shadow-md rounded-md border-t-3 ${borderColor} h-full card" id="div-card">
                <div class="flex justify-between">
                    <img src="${statusIcon}" alt="" class="w-6 h-6 items-center">
                    <p class="text-[#EF4444] bg-[#FEECEC] py-1 px-6 rounded-2xl">${issue.priority}</p>
                </div>
                <p class="font-bold text-xl">${issue.title}</p>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="flex gap-1 border-b-2 border-gray-300 ">
                    <p class="text-[#EF4444] bg-[#FEECEC]  px-3 rounded-2xl font-semibold uppercase mb-4">${issue.labels[0]}</p>
                    <p class="text-[#D97706] bg-[#FFF8DB] px-3 rounded-2xl font-semibold uppercase mb-4">${issue.labels[1]}</p>
                </div>
                <p class="text-[#64748B]">${issue.author} </p>
                <p class="text-[#64748B]">${issue.createdAt}</p>
            </div>
`;
        cardContainer.append(newDiv);
    };
};

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}
`)
.then(res => res.json())
.then(data =>{
    const allWords = data.data;
    const filterWords =allWords.filter(word => word.title.toLowerCase().includes(searchValue))
   displayAllIssue(filterWords);
});
});



const openModal = async (id) => {
     const url =` https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
     
     const res =await fetch(url);
     const details = await res.json();
    displayWordDetails(details.data);
    };

    const displayWordDetails = (word) => {
        
        const detailBox = document.getElementById("details-container");

        detailBox.innerHTML =`
       
   <h1 class="text-xl font-bold">${word.title}</h1>
   <div class="flex gap-3 items-center">
     <p class="px-2 bg-green-500 rounded-2xl text-white">${word.status}</p>
     <p class=" flex items-center gap-2"> <i class="fa-solid fa-circle small"></i>Opened by ${word.author}</p>
     <p class=" flex items-center gap-2"><i class="fa-solid fa-circle small"></i>${word.createdAt}</p>
   </div>
   <div class="flex gap-2 items-center">
    <p class="text-[#EF4444] bg-[#FECACA] px-3  rounded-2xl font-semibold">${word.labels[0]}</p>
    <p class="text-[#D97706] bg-[#FDE68A] px-2  rounded-2xl font-semibold">${word.labels[1]}</p>
   </div>
   <p class="text-[#64748B]">${word.description}</p>
   <div class=" grid grid-cols-2 bg-slate-100 p-5 rounded-md">
    <div class="">
    <p>Assignee:</p>
     <p class="font-bold">${word.assignee}</p>
    
   </div>
      <div class="">
     <p>Priority:</p>
      <p class="w-17 text-center px-2 rounded-2xl bg-[#EF4444] text-white">${word.priority}</p>
   </div>
 
   </div>
 
   </div>
    <div class="modal-action">
      <form method="dialog">
       
        <button class="btn btn-primary outline-none">Close</button>
      </form>
    </div>
 `;
        document.getElementById("issue_modal").showModal();
    }
    
  
   
    


const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
    


allBtn.addEventListener("click", () => {
displayAllIssue(allIssuesData);
 document.getElementById("issues-count").innerText = allIssuesData.length + " Issues";
setActive(allBtn)
});


openBtn.addEventListener("click", () => {
    
    const openIssues = allIssuesData.filter(issue => issue.status === "open");
  document.getElementById("issues-count").innerText =openIssues.length + " Issues";
    displayAllIssue(openIssues)
    setActive(openBtn)
});


closedBtn.addEventListener("click", () => {
     
    const closedIssues = allIssuesData.filter(issue =>issue.status === "closed");
     document.getElementById("issues-count").innerText =closedIssues.length + " Issues";
    displayAllIssue(closedIssues)
    setActive(closedBtn)
})


function setActive (button){
      allBtn.classList.remove("bg-blue-500","text-white");
  openBtn.classList.remove("bg-blue-500","text-white");
  closedBtn.classList.remove("bg-blue-500","text-white");

  button.classList.add("bg-blue-500","text-white");
}


setActive(allBtn);

allIssues();

