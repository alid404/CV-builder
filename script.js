// Retrieve elements
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const downloadButton = document.querySelector('[alt="Download"]');
const addExperienceButton = document.getElementById('addExperienceBtn');
const addEducationButton = document.getElementById('addEducationBtn');
const addSkillsButton = document.getElementById('addSkillsBtn');
const addLanguagesButton = document.getElementById('addLanguagesBtn');
const addSocialButton = document.getElementById('addSocialBtn');
const addExtraInfoButton = document.getElementById('addExtraInfoBtn');
const addReferencesButton = document.getElementById('addReferencesBtn');

// Check if there's data in local storage and load it
document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('resumeData'));

  if (savedData) {
    document.getElementById('name').innerText = savedData.name || 'YOUR NAME';
    document.getElementById('skills').innerHTML = savedData.skills || `<li contenteditable="true">Microsoft Word - Expert</li>`;
    document.getElementById('languages').innerHTML = savedData.languages || `<li contenteditable="true">Spanish - Fluent</li>`;
    document.getElementById('social').innerHTML = savedData.social || `<li contenteditable="true">LinkedIn - linkedin.com/in/yourname</li>`;
    document.getElementById('extraInfo').innerHTML = savedData.extraInfo || `<li contenteditable="true">Extra information.</li>`;
    document.getElementById('references').innerHTML = savedData.references || `<li contenteditable="true">Available on request.</li>`;
  }
});

// Save to local storage
saveButton.addEventListener('click', () => {
  const resumeData = {
    name: document.getElementById('name').innerText,
    skills: document.getElementById('skills').innerHTML,
    languages: document.getElementById('languages').innerHTML,
    social: document.getElementById('social').innerHTML,
    extraInfo: document.getElementById('extraInfo').innerHTML,
    references: document.getElementById('references').innerHTML,
  };

  localStorage.setItem('resumeData', JSON.stringify(resumeData));
  alert('Resume saved!');
});

// Download as PDF
downloadButton.addEventListener('click', () => {
  const resumeElement = document.querySelector('.flex.bg-white');

  const options = {
    margin: 1,
    filename: 'resume.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(resumeElement).set(options).save();
});

// Function to add new item to a list section
function addNewListItem(containerId, placeholderText) {
  const container = document.getElementById(containerId);
  const newItem = document.createElement('li');
  newItem.contentEditable = true;
  newItem.innerText = placeholderText;
  container.appendChild(newItem);
}

// Universal Delete Button Creator
function createDeleteButton(section) {
  const deleteButton = document.createElement('span');
  deleteButton.innerHTML = '✕';
  deleteButton.classList.add(
      'delete-btn', 
      'text-red-500', 
      'cursor-pointer', 
      'ml-2', 
      'hover:text-red-700'
  );
  deleteButton.addEventListener('click', () => {
      section.remove();
      saveResume();
  });
  return deleteButton;
}

// Add new Experience section
addExperienceButton.addEventListener('click', () => {
  const experienceContainer = document.querySelector('.mb-8 #experience1');
  const newExperience = document.createElement('div');
  newExperience.classList.add('mb-6');
  newExperience.innerHTML = `
    <h4 class="text-sm font-semibold" contenteditable="true">Job Title at Company</h4>
    <p class="text-xs text-gray-500" contenteditable="true">Jan 2024 - Present | City, ST</p>
    <ul class="list-disc pl-6 text-xs" contenteditable="true">
      <li>Key achievements, tasks, and projects.</li>
    </ul>
  `;
  experienceContainer.appendChild(newExperience);
});

// Add new Education section
addEducationButton.addEventListener('click', () => {
  const educationContainer = document.querySelector('.mb-8 #education1');
  const newEducation = document.createElement('div');
  newEducation.classList.add('mb-6');
  newEducation.innerHTML = `
    <h4 class="text-sm font-semibold" contenteditable="true">Degree Title at University Name</h4>
    <p class="text-xs text-gray-500" contenteditable="true">Jan 2024 - Jan 2024 | City, ST</p>
    <p class="text-xs" contenteditable="true">Relevant coursework or achievements.</p>
  `;
  educationContainer.appendChild(newEducation);
});

// Add new Skills item
addSkillsButton.addEventListener('click', () => {
  addNewListItem('skills', 'New skill - proficiency level');
});

// Add new Languages item
addLanguagesButton.addEventListener('click', () => {
  addNewListItem('languages', 'New language - proficiency level');
});

// Add new Social link
addSocialButton.addEventListener('click', () => {
  addNewListItem('social', 'Social Platform - link or username');
});

// Add new Extra Info item
addExtraInfoButton.addEventListener('click', () => {
  addNewListItem('extraInfo', 'Additional information');
});

// Add new Reference
addReferencesButton.addEventListener('click', () => {
  addNewListItem('references', 'New reference - contact information');
});

function addListItem(listId) {
  const list = document.getElementById(listId);
  const newItem = document.createElement("li");
  newItem.contentEditable = "true";
  newItem.textContent = "New item"; // Placeholder text for the new item
  list.appendChild(newItem);
}

document.getElementById("addSkillsBtn").addEventListener("click", () => addListItem("skills"));
document.getElementById("addLanguagesBtn").addEventListener("click", () => addListItem("languages"));
document.getElementById("addSocialBtn").addEventListener("click", () => addListItem("social"));
document.getElementById("addExtraInfoBtn").addEventListener("click", () => addListItem("extraInfo"));
document.getElementById("addReferencesBtn").addEventListener("click", () => addListItem("references"));