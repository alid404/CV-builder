document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveButton');
  const downloadButton = document.getElementById('downloadButton');

  // Save Resume Function
  function saveResume() {
    try {
      const resumeData = {
        name: document.querySelector('h1').innerText,
        jobTitle: document.querySelector('h2').innerText,
        location: document.querySelector('h3').innerText,
        summary: document.querySelector('p.mt-2.leading-normal.text-gray-700').innerText,
        skills: Array.from(document.querySelectorAll('ul.flex.flex-wrap li')).map(skill => skill.innerText),
        education: Array.from(document.querySelectorAll('section.break-inside-avoid'))
          .filter(section => section.querySelector('h3').innerText.toLowerCase().includes('education'))
          .map(edu => ({
            school: edu.querySelector('h3').innerText,
            period: edu.querySelector('p.leading-normal.text-gray-500').innerText,
            details: Array.from(edu.querySelectorAll('ul li')).map(li => li.innerText)
          })),
        experience: Array.from(document.querySelectorAll('section.break-inside-avoid'))
          .filter(section => section.querySelector('h3').innerText.toLowerCase().includes('experience'))
          .map(exp => ({
            title: exp.querySelector('h3').innerText,
            period: exp.querySelector('p.text-sm.leading-normal.text-gray-500').innerText,
            details: Array.from(exp.querySelectorAll('ul li')).map(li => li.innerText)
          }))
      };

      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      console.log('Resume saved successfully');
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  }

  // Download Resume as PDF
  function downloadResume() {
    const element = document.querySelector('main');

    html2pdf()
      .set({
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(element)
      .save();
  }

  // Add Section Function
  function addSection(type) {
    const section = document.createElement('section');
    section.className = 'break-inside-avoid';
    
    const title = document.createElement('h3');
    title.contentEditable = 'true';
    title.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    
    const period = document.createElement('p');
    period.className = type === 'experience' 
      ? 'text-sm leading-normal text-gray-500' 
      : 'leading-normal text-gray-500';
    period.contentEditable = 'true';
    period.innerText = 'Period (e.g., 2020 - Present)';
    
    const detailsList = document.createElement('ul');
    const detailItem = document.createElement('li');
    detailItem.contentEditable = 'true';
    detailItem.innerText = 'Detail (e.g., Job Description)';
    detailsList.appendChild(detailItem);
    
    section.appendChild(title);
    section.appendChild(period);
    section.appendChild(detailsList);
    
    // Add event listeners for auto-save
    [title, period, ...detailsList.children].forEach(el => {
      el.addEventListener('blur', saveResume);
    });

    document.querySelector('main').appendChild(section);
    saveResume(); // Save after adding new section
  }

  // Add Plus Sign to Section Titles
  function addPlusSigns() {
    const sectionTitles = document.querySelectorAll('h3');
    
    sectionTitles.forEach(title => {
      // Check if plus sign already exists
      if (title.nextElementSibling && title.nextElementSibling.classList.contains('plus-sign')) return;

      const plusSign = document.createElement('span');
      plusSign.innerHTML = ' &#10010;'; // Plus sign
      plusSign.className = 'plus-sign cursor-pointer text-green-500 ml-2 text-sm';
      plusSign.style.userSelect = 'none';
      
      plusSign.addEventListener('click', () => {
        const sectionType = title.innerText.toLowerCase();
        if (sectionType.includes('experience') || sectionType.includes('education')) {
          addSection(sectionType);
        }
      });

      title.parentNode.insertBefore(plusSign, title.nextSibling);
    });
  }

  // Make sections editable with auto-save
  function makeEditable() {
    const editableSections = [
      'h1', 'h2', 'h3', 
      'p.mt-2.leading-normal.text-gray-700',
      'ul.flex.flex-wrap li',
      'section.break-inside-avoid h3',
      'section.break-inside-avoid p',
      'section.break-inside-avoid ul li'
    ];

    editableSections.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.addEventListener('blur', saveResume);
      });
    });
  }

  // Restore saved data (keep the existing restoreResume function)
  function restoreResume() {
    const savedData = JSON.parse(localStorage.getItem('resumeData'));

    if (savedData) {
      // Existing restore logic remains the same
      // ... (paste the existing restoreResume function)
    }
  }

  // Event Listeners
  if (saveButton) saveButton.addEventListener('click', saveResume);
  if (downloadButton) downloadButton.addEventListener('click', downloadResume);

  // Initialize
  makeEditable();
  restoreResume();
  
  // Add plus signs after restoration
  setTimeout(addPlusSigns, 100);

  // Re-add plus signs if content changes
  const observer = new MutationObserver(addPlusSigns);
  observer.observe(document.querySelector('main'), {
    childList: true,
    subtree: true
  });
});