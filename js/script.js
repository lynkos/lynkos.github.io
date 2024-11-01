const about = document.querySelector('#about')
const projects = document.querySelector('#projects')
const experience = document.querySelector('#experience')
const contact = document.querySelector('#contact')
const aboutContent = document.querySelector('#about-content');
const projectsContent = document.querySelector('#projects-content')
const experienceContent = document.querySelector('#experience-content')
const contactContent = document.querySelector('#contact-content')

about.addEventListener('click', () => {
    const aboutBox = new WinBox("About Me", {
      modal: true,
      class: "modern",
      mount: aboutContent
    });
})

projects.addEventListener('click', () => {
  const projectsBox = new WinBox("Projects", {
    class: "modern",
    modal: true,
    mount: projectsContent
  });
})

experience.addEventListener('click', () => {
  const experienceBox = new WinBox("Experience", {
    class: "modern",
    modal: true,
    mount: experienceContent
  });
})

contact.addEventListener('click', () => {
    const contactBox = new WinBox("Contact", {
      class: "modern",
      width: "55%",
      mount: contactContent,
      modal: true
    });
})