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
      class: "modern no-full",
      modal: true,
      mount: aboutContent,
      width: "75%",
      height: "75%",
      x: "center",
      y: "center",
    });
})

projects.addEventListener('click', () => {
  const projectsBox = new WinBox("Projects", {
    class: "modern no-full",
    modal: true,
    mount: projectsContent,
    width: "75%",
    height: "75%",
    x: "center",
    y: "center"
  });
})

experience.addEventListener('click', () => {
  const experienceBox = new WinBox("Experience", {
    class: "modern no-full",
    modal: true,
    mount: experienceContent,
    width: "75%",
    height: "75%",
    x: "center",
    y: "center"
  });
})

contact.addEventListener('click', () => {
    const contactBox = new WinBox("Contact", {
      class: "modern no-full",
      modal: true,
      mount: contactContent,
      width: "75%",
      height: "75%",
      x: "center",
      y: "center",
    });
})