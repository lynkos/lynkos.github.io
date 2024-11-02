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
      class: "modern no-full",
      mount: aboutContent,
      x: "center",
      y: "center",
    });
})

projects.addEventListener('click', () => {
  const projectsBox = new WinBox("Projects", {
    class: "modern no-full",
    modal: true,
    mount: projectsContent,
    x: "center",
    y: "center"
  });
})

experience.addEventListener('click', () => {
  const experienceBox = new WinBox("Experience", {
    class: "modern no-full",
    modal: true,
    mount: experienceContent,
    x: "center",
    y: "center"
  });
})

contact.addEventListener('click', () => {
    const contactBox = new WinBox("Contact", {
      class: "modern no-full",
      mount: contactContent,
      modal: true,
      x: "center",
      y: "center",
    });
})