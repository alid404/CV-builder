const saveButton = document.getElementById('saveButton');
const downloadButton = document.getElementById('downloadButton');

const addButtons = {
    skills: document.getElementById('addSkillsBtn'),
    languages: document.getElementById('addLanguagesBtn'),
    social: document.getElementById('addSocialBtn'),
    extraInfo: document.getElementById('addExtraInfoBtn'),
    references: document.getElementById('addReferencesBtn'),
    experience: document.getElementById('addExperienceButton'),
    education: document.getElementById('addEducationButton')
};

function createDeleteButton(item) {
  const deleteButton = document.createElement('span');
  deleteButton.innerHTML = '✕';
  deleteButton.classList.add('delete-btn', 'text-red-500', 'cursor-pointer', 'ml-2', 'hover:text-red-700');
  deleteButton.addEventListener('click', () => {
      item.remove();
      saveResume();
  });
  return deleteButton;
}

function addSection(type, selectorPrefix = '') {
    const containers = {
        experience: document.querySelector(`${selectorPrefix}#experience1`),
        education: document.querySelector(`${selectorPrefix}#education1`)
    };

    const container = containers[type];
    if (!container) return;

    const newSection = document.createElement('div');
    newSection.classList.add('mb-6', 'resume-section');

    const sectionTemplates = {
        experience: `
            <div class="section-header flex items-center justify-between">
                <h3 class="section-title" contenteditable="true">Job Title at Company</h3>
            </div>
            <p class="section-date" contenteditable="true">Jan 2024 - Present | Location</p>
            <ul class="section-details" contenteditable="true">
                <li>Key responsibility or achievement</li>
            </ul>
        `,
        education: `
            <div class="section-header flex items-center justify-between">
                <h3 class="section-title" contenteditable="true">Degree at Institution</h3>
            </div>
            <p class="section-date" contenteditable="true">Jan 2024 - Present | Location</p>
            <p class="section-details" contenteditable="true">Additional details</p>
        `
    };

    newSection.innerHTML = sectionTemplates[type];
    const headerSection = newSection.querySelector('.section-header');
    const deleteButton = createDeleteButton(newSection);
    headerSection.appendChild(deleteButton);

    container.appendChild(newSection);
    saveResume();
}

function addListItem(containerId, placeholderText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const newItem = document.createElement('li');
  newItem.classList.add('flex', 'justify-between', 'items-center', 'bg-blue-50', 'text-blue-600', 'rounded-full', 'px-3', 'py-1', 'font-medium');

  const content = document.createElement('span');
  content.contentEditable = true;
  content.innerText = placeholderText;

  newItem.appendChild(content);
  newItem.appendChild(createDeleteButton(newItem));

  container.appendChild(newItem);
  saveResume();
}

function attachEventListeners() {
    Object.entries({
        skills: 'New skill - proficiency level',
        languages: 'New language - proficiency level',
        social: 'Social Platform - link or username',
        extraInfo: 'Additional information',
        references: 'New reference - contact information'
    }).forEach(([id, placeholder]) => {
        const button = addButtons[id];
        if (button) {
            button.addEventListener('click', () => addListItem(id, placeholder));
        }
    });

    ['experience', 'education'].forEach(type => {
        const button = addButtons[type];
        if (button) {
            button.addEventListener('click', () => addSection(type));
        }
    });

    // Save Button
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            saveResume();
            alert('Resume saved!');
        });
    }
}

function saveResume() {
    const resumeData = {
        name: document.getElementById('name')?.innerText || 'Your Name',
        resumeName: document.getElementById('resumeName')?.innerText || 'Your Name',
        jobTitle: document.getElementById('jobTitle')?.innerText || 'Job Title',
        contactInfo: document.getElementById('contactInfo')?.innerText || 'Contact Info',
        summary: document.getElementById('summary')?.innerText || 'Professional Summary',
        skills: document.getElementById('skills')?.innerHTML || '',
        languages: document.getElementById('languages')?.innerHTML || '',
        social: document.getElementById('social')?.innerHTML || '',
        extraInfo: document.getElementById('extraInfo')?.innerHTML || '',
        references: document.getElementById('references')?.innerHTML || '',
        experience: document.getElementById('experience1')?.innerHTML || '',
        education: document.getElementById('education1')?.innerHTML || ''
    };

    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

function loadSavedResume() {
  const savedData = JSON.parse(localStorage.getItem('resumeData'));
  if (!savedData) return;

  const fields = [
      'name', 'resumeName', 'jobTitle', 'contactInfo', 
      'summary', 'skills', 'languages', 'social', 
      'extraInfo', 'references', 'experience', 'education'
  ];

  fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
          element.innerHTML = savedData[field] || element.innerHTML;
      }
  });

  // Add delete buttons for skills and languages with event listeners
  ['skills', 'languages'].forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
          section.querySelectorAll('li').forEach(item => {
              // Remove any existing delete buttons first to prevent duplicates
              const existingDeleteBtn = item.querySelector('.delete-btn');
              if (existingDeleteBtn) {
                  existingDeleteBtn.remove();
              }

              // Create and append new delete button
              const deleteBtn = createDeleteButton(item);
              item.appendChild(deleteBtn);
          });
      }
  });

  // Add delete buttons for experience and education sections
  ['experience1', 'education1'].forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
          section.querySelectorAll('> div').forEach(item => {
              // Remove any existing delete buttons first
              const existingDeleteBtn = item.querySelector('.delete-btn');
              if (existingDeleteBtn) {
                  existingDeleteBtn.remove();
              }

              // Create and append new delete button
              const deleteBtn = createDeleteButton(item);
              const header = item.querySelector('.section-header') || item.querySelector('.flex') || item;
              header.appendChild(deleteBtn);
          });
      }
  });
}

document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
    loadSavedResume();
    ['experience1', 'education1', 'skills', 'languages', 'social', 'extraInfo', 'references']
        .forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.querySelectorAll('li, > div').forEach(item => {
                    const existingDeleteBtn = item.querySelector('.delete-btn');
                    if (!existingDeleteBtn) {
                        const deleteBtn = createDeleteButton(item);
                        const header = item.querySelector('.section-header') || 
                                       item.querySelector('.flex') || 
                                       item;
                        header.appendChild(deleteBtn);
                    }
                });
            }
        });
});

function addExperienceSection(selectorPrefix = '') {
  const experienceContainer = document.querySelector(`${selectorPrefix}#experience1`);
  const newExperience = document.createElement('div');
  newExperience.classList.add('mb-6');
  newExperience.innerHTML = `
      <h4 class="text-sm font-semibold" contenteditable="true">Job Title at Company</h4>
      <p class="text-xs text-gray-500" contenteditable="true">Jan 2024 - Present | City, ST</p>
      <ul class="list-disc pl-6 text-xs" contenteditable="true">
          <li>Key achievements, tasks, and projects.</li>
          <li>Important keywords taken from job advert.</li>
      </ul>
  `;

  const deleteButton = createDeleteButton(newExperience);
  const deleteContainer = document.createElement('span');
  deleteContainer.classList.add('delete-container');
  deleteContainer.appendChild(deleteButton);
  
  experienceContainer.appendChild(newExperience);
  saveResume();
}

function addEducationSection(selectorPrefix = '') {
  const educationContainer = document.querySelector(`${selectorPrefix}#education1`);
  const newEducation = document.createElement('div');
  newEducation.classList.add('mb-6');
  newEducation.innerHTML = `
      <h4 class="text-sm font-semibold" contenteditable="true">Degree Title at University Name</h4>
      <p class="text-xs text-gray-500" contenteditable="true">Jan 2024 - Jan 2024 | City, ST</p>
      <p class="text-xs" contenteditable="true">List of qualifications and relevant coursework.</p>
  `;
  const deleteButton = createDeleteButton(newEducation);
  const deleteContainer = document.createElement('span');
  deleteContainer.classList.add('delete-container');
  deleteContainer.appendChild(deleteButton);
  
  educationContainer.appendChild(newEducation);
  saveResume();
}

document.addEventListener('DOMContentLoaded', () => {
  const experiencePlusSign = document.querySelector('.experience-title .plus-sign');
  const educationPlusSign = document.querySelector('.education-title .plus-sign');

  if (experiencePlusSign) {
      experiencePlusSign.addEventListener('click', () => addExperienceSection());
  }

  if (educationPlusSign) {
      educationPlusSign.addEventListener('click', () => addEducationSection());
  }

  ['experience1', 'education1'].forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
          section.querySelectorAll('> div').forEach(item => {
              const existingDeleteBtn = item.querySelector('.delete-btn');
              if (!existingDeleteBtn) {
                  const deleteBtn = createDeleteButton(item);
                  const deleteContainer = document.createElement('span');
                  deleteContainer.classList.add('delete-container');
                  deleteContainer.appendChild(deleteBtn);
                  item.appendChild(deleteContainer);
              }
          });
      }
  });
});

//just for template 1//

    document.getElementById('addSkillsBtn').addEventListener('click', function() {
        const skillItem = document.createElement('li');
        skillItem.className = "flex items-center justify-between bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm font-medium transform transition duration-200 hover:bg-blue-200 hover:-translate-y-1";
        skillItem.innerHTML = `${newSkill} <span class="text-gray-500 cursor-pointer font-semibold hover:text-red-500" onclick="this.parentElement.remove()">✕</span>`;
        document.getElementById('skills').appendChild(skillItem);
    });


//just for template 4 //

document.addEventListener("DOMContentLoaded", function () {
    // Add new experience
    document.getElementById("addExperienceBtn").addEventListener("click", function () {
        const experienceContainer = document.getElementById("experienceContainer");
        const newExperience = document.createElement("div");
        newExperience.classList.add("mb-6", "relative", "pl-4", "border-l-2", "border-gray-300");
        newExperience.innerHTML = `
            <div class="mb-2">
                <div class="flex flex-col md:flex-row justify-between">
                    <h3 class="text-xl font-bold" contenteditable="true">New Job Title</h3>
                    <div class="text-gray-600" contenteditable="true">Company Name</div>
                    <button class="deleteBtn text-red-500">✖</button>
                </div>
                <div class="text-gray-500" contenteditable="true">Dates</div>
            </div>
            <div class="text-gray-600" contenteditable="true">
                <p class="mb-2">Description of role and responsibilities goes here.</p>
            </div>
        `;
        experienceContainer.appendChild(newExperience);
        newExperience.querySelector(".deleteBtn").addEventListener("click", function () {
            newExperience.remove();
        });
    });

    // Add new skill
    document.querySelectorAll(".addSkillBtn").forEach(function (button) {
        button.addEventListener("click", function (event) {
            const container = event.target.closest("section").querySelector(".skillsContainer");
            const newSkill = document.createElement("div");
            newSkill.classList.add("flex", "justify-between", "mb-1");
            newSkill.innerHTML = `
                <span contenteditable="true">New Skill</span>
                <span contenteditable="true">90%</span>
                <button class="deleteBtn text-red-500">✖</button>
            `;
            container.appendChild(newSkill);
            newSkill.querySelector(".deleteBtn").addEventListener("click", function () {
                newSkill.remove();
            });
        });
    });
});
