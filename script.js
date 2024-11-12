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