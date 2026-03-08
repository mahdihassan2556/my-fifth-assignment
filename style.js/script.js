let allIssuesData = [];
const allIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then((json) =>{
            allIssuesData = json.data;
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
 <div class="p-5 space-y-3  shadow-md rounded-md border-t-3 ${borderColor} h-full" id="div-card">
                <div class="flex justify-between">
                    <img src="${statusIcon}" alt="" class="w-6 h-6 items-center">
                    <p class="text-[#EF4444] bg-[#FEECEC] py-1 px-6 rounded-2xl">${issue.priority}</p>
                </div>
                <p class="font-bold text-xl">${issue.title}</p>
                <p class="text-[#64748B]">${issue.description}</p>
                <div class="flex gap-1 border-b-2 border-gray-300 pb-4">
                    <p class="text-[#EF4444] bg-[#FEECEC] py-1 px-3 rounded-2xl">${issue.labels[0]}</p>
                    <p class="text-[#D97706] bg-[#FFF8DB] py-1 px-3 rounded-2xl">${issue.labels[1]}</p>
                </div>
                <p class="text-[#64748B]">${issue.author} </p>
                <p class="text-[#64748B]">${issue.createdAt}</p>
            </div>
`;
        cardContainer.append(newDiv);
    };
};
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");


allBtn.addEventListener("click", () => {
displayAllIssue(allIssuesData);
setActive(allBtn)
});


openBtn.addEventListener("click", () => {

    const openIssues = allIssuesData.filter(issue => issue.status === "open");

    displayAllIssue(openIssues)
    setActive(openBtn)
});


closedBtn.addEventListener("click", () => {
     
    const closedIssues = allIssuesData.filter(issue =>issue.status === "closed");

    displayAllIssue(closedIssues)
    setActive(closedBtn)
})


function setActive (button){
      allBtn.classList.remove("bg-blue-500","text-white");
  openBtn.classList.remove("bg-blue-500","text-white");
  closedBtn.classList.remove("bg-blue-500","text-white");

  button.classList.add("bg-blue-500","text-white");
}

displayAllIssue(allIssuesData);
setActive(allBtn);

allIssues();

