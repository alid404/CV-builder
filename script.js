const saveButton = document.getElementById('saveButton');
const downloadButton = document.getElementById('downloadButton');
const addSkillsButton = document.getElementById('addSkillsBtn');
const addLanguagesButton = document.getElementById('addLanguagesBtn');
const addSocialButton = document.getElementById('addSocialBtn');
const addExtraInfoButton = document.getElementById('addExtraInfoBtn');
const addReferencesButton = document.getElementById('addReferencesBtn');
const addExperienceButton = document.getElementById('addExperienceButton');
const addEducationButton = document.getElementById('addEducationButton');

// Function to add delete buttons
function addDeleteButton(section) {
  const deleteButton = document.createElement('span');
  deleteButton.innerHTML = '✕';
  deleteButton.classList.add('delete-btn', 'text-red-500', 'cursor-pointer', 'ml-2', 'hover:text-red-700');
  deleteButton.addEventListener('click', () => {
    section.remove();
    saveResume();
  });
  return deleteButton;
}

// Function to initialize editable titles
function initializeEditableTitles(selectorPrefix = '') {
  const titles = document.querySelectorAll(`${selectorPrefix}.section-title:not(.plus-btn)`);
  titles.forEach(title => {
    title.contentEditable = true;
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        title.blur();
      }
    });
  });

  const experiencePlusSign = document.querySelector(`${selectorPrefix}.experience-title .plus-sign`);
  const educationPlusSign = document.querySelector(`${selectorPrefix}.education-title .plus-sign`);

  if (experiencePlusSign) {
    experiencePlusSign.addEventListener('click', () => addExperienceSection(selectorPrefix));
  }

  if (educationPlusSign) {
    educationPlusSign.addEventListener('click', () => addEducationSection(selectorPrefix));
  }
}

// Function to add experience section
function addExperienceSection(selectorPrefix = '') {
  const experienceContainer = document.querySelector(`${selectorPrefix}#experience1`);
  const newExperience = document.createElement('div');
  newExperience.classList.add('mb-6', 'relative', 'group');
  newExperience.innerHTML = `
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold" contenteditable="true">Job Title at Company</h4>
    </div>
    <p class="text-xs text-gray-500" contenteditable="true">Jan 2024 - Present | City, ST</p>
    <ul class="list-disc pl-6 text-xs" contenteditable="true">
      <li>Key achievements, tasks, and projects.</li>
    </ul>
  `;

  const deleteButton = addDeleteButton(newExperience);
  newExperience.querySelector('.flex').appendChild(deleteButton);

  experienceContainer.appendChild(newExperience);
}

// Function to add education section
function addEducationSection(selectorPrefix = '') {
  const educationContainer = document.querySelector(`${selectorPrefix}#education1`);
  const newEducation = document.createElement('div');
  newEducation.classList.add('mb-6', 'relative', 'group');
  newEducation.innerHTML = `
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold" contenteditable="true">Degree Title at University Name</h4>
    </div>
    <p class="text-xs text-gray-500" contenteditable="true">Jan 2024 - Jan 2024 | City, ST</p>
    <p class="text-xs" contenteditable="true">Relevant coursework or achievements.</p>
  `;

  const deleteButton = addDeleteButton(newEducation);
  newEducation.querySelector('.flex').appendChild(deleteButton);

  educationContainer.appendChild(newEducation);
}

function addNewListItem(containerId, placeholderText) {
  const container = document.getElementById(containerId);
  const newItem = document.createElement('li');
  newItem.classList.add('flex', 'items-center', 'justify-between', 'group');

  const content = document.createElement('span');
  content.contentEditable = true;
  content.innerText = placeholderText;

  newItem.appendChild(content);
  newItem.appendChild(addDeleteButton(newItem));

  container.appendChild(newItem);
}

addSkillsButton.addEventListener('click', () => {
  addNewListItem('skills', 'New skill - proficiency level');
});

addLanguagesButton.addEventListener('click', () => {
  addNewListItem('languages', 'New language - proficiency level');
});

addSocialButton.addEventListener('click', () => {
  addNewListItem('social', 'Social Platform - link or username');
});

addExtraInfoButton.addEventListener('click', () => {
  addNewListItem('extraInfo', 'Additional information');
});

addReferencesButton.addEventListener('click', () => {
  addNewListItem('references', 'New reference - contact information');
});

function saveResume() {
  const resumeData = {
    name: document.getElementById('name').innerText,
    resumeName: document.getElementById('resumeName').innerText,
    jobTitle: document.getElementById('jobTitle').innerText,
    contactInfo: document.getElementById('contactInfo').innerText,
    summary: document.getElementById('summary').innerText,
    skills: document.getElementById('skills').innerHTML,
    languages: document.getElementById('languages').innerHTML,
    social: document.getElementById('social').innerHTML,
    extraInfo: document.getElementById('extraInfo').innerHTML,
    references: document.getElementById('references').innerHTML,
    experience: document.getElementById('experience1').innerHTML,
    education: document.getElementById('education1').innerHTML,
    sectionTitles: Array.from(document.querySelectorAll('.section-title:not(.plus-btn)')).map(title => title.innerText)
  };

  localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

saveButton.addEventListener('click', () => {
  saveResume();
  alert('Resume saved!');
});

document.addEventListener('DOMContentLoaded', () => {
  initializeEditableTitles();

  document.querySelectorAll('#experience1 > div').forEach(section => {
    const header = section.querySelector('h4');
    const wrapper = document.createElement('div');
    wrapper.classList.add('flex', 'items-center', 'justify-between');
    header.parentNode.insertBefore(wrapper, header);
    wrapper.appendChild(header);
    wrapper.appendChild(addDeleteButton(section));
  });

  document.querySelectorAll('#education1 > div').forEach(section => {
    const header = section.querySelector('h4');
    const wrapper = document.createElement('div');
    wrapper.classList.add('flex', 'items-center', 'justify-between');
    header.parentNode.insertBefore(wrapper, header);
    wrapper.appendChild(header);
    wrapper.appendChild(addDeleteButton(section));
  });

  ['skills', 'languages', 'social', 'extraInfo', 'references'].forEach(sectionId => {
    const items = document.querySelectorAll(`#${sectionId} > li`);
    items.forEach(item => {
      const content = item.innerHTML;
      item.classList.add('flex', 'items-center', 'justify-between', 'group');
      const span = document.createElement('span');
      span.contentEditable = true;
      span.innerHTML = content;
      item.innerHTML = '';
      item.appendChild(span);
      item.appendChild(addDeleteButton(item));
    });
  });

  const savedData = JSON.parse(localStorage.getItem('resumeData'));
  if (savedData) {
    document.getElementById('name').innerText = savedData.name || 'YOUR NAME';
    document.getElementById('resumeName').innerText = savedData.resumeName || 'YOUR NAME';
    document.getElementById('jobTitle').innerText = savedData.jobTitle || 'Job Title';
    document.getElementById('contactInfo').innerText = savedData.contactInfo || 'Contact Information';
    document.getElementById('summary').innerText = savedData.summary || 'Professional Summary';
    document.getElementById('skills').innerHTML = savedData.skills || `<li class="flex items-center justify-between group"><span contenteditable="true">Microsoft Word - Expert</span></li>`;
    document.getElementById('languages').innerHTML = savedData.languages || `<li class="flex items-center justify-between group"><span contenteditable="true">Spanish - Fluent</span></li>`;
    document.getElementById('social').innerHTML = savedData.social || `<li class="flex items-center justify-between group"><span contenteditable="true">LinkedIn - linkedin.com/in/yourname</span></li>`;
    document.getElementById('extraInfo').innerHTML = savedData.extraInfo || `<li class="flex items-center justify-between group"><span contenteditable="true">Extra information.</span></li>`;
    document.getElementById('references').innerHTML = savedData.references || `<li class="flex items-center justify-between group"><span contenteditable="true">Available on request.</span></li>`;
    document.getElementById('experience1').innerHTML = savedData.experience || '';
    document.getElementById('education1').innerHTML = savedData.education || '';

    if (savedData.sectionTitles) {
      const titles = document.querySelectorAll('.section-title:not(.plus-btn)');
      titles.forEach((title, index) => {
        if (savedData.sectionTitles[index]) {
          title.innerText = savedData.sectionTitles[index];
        }
      });
    }

    initializeDeleteButtons();
  }

  if (addExperienceButton) {
    addExperienceButton.addEventListener('click', () => addExperienceSection());
  }

  if (addEducationButton) {
    addEducationButton.addEventListener('click', () => addEducationSection());
  }
});

function initializeDeleteButtons() {
  document.querySelectorAll('#experience1 > div, #education1 > div').forEach(section => {
    if (!section.querySelector('.delete-btn')) {
      const deleteButton = addDeleteButton(section);
      section.querySelector('.flex').appendChild(deleteButton);
    }
  });
}