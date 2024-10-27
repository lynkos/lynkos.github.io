const about = document.querySelector('#about')
const projects = document.querySelector('#projects')
const experience = document.querySelector('#experience')
const contact = document.querySelector('#contact')
const aboutContent = document.querySelector('#about-content');
const projectsContent = document.querySelector('#projects-content')
const experienceContent = document.querySelector('#experience-content')
const contactContent = document.querySelector('#contact-content')

about.addEventListener('click', () => {
    const aboutBox = new WinBox({
      width: "350px",
      height: "350px",
      top: 50,
      right: 70,
      bottom: 50,
      left: 50,
      mount: aboutContent,
      onfocus: function () {
        this.setBackground("#00aa00");
      },
      onblur: function () {
        this.setBackground("#777");
      },
    });
})

projects.addEventListener('click', () => {
  const projectsBox = new WinBox({
    background: "grey",
    width: "350px",
    height: "350px",
    top: 50,
    right: 70,
    bottom: 50,
    left: 100,
    mount: projectsContent,
    onfocus: function () {
      this.setBackground("#00aa00");
    },
    onblur: function () {
      this.setBackground("#777");
    },
  });
})

experience.addEventListener('click', () => {
  const experienceBox = new WinBox({
    background: "grey",
    width: "350px",
    height: "350px",
    top: 50,
    right: 70,
    bottom: 50,
    left: 150,
    mount: experienceContent,
    onfocus: function () {
      this.setBackground("#00aa00");
    },
    onblur: function () {
      this.setBackground("#777");
    },
  });
})

contact.addEventListener('click', () => {
    const contactBox = new WinBox({
      background: "grey",
      width: "350px",
      height: "350px",
      top: 50,
      right: 70,
      bottom: 50,
      left: 200,
      mount: contactContent,
      onfocus: function () {
        this.setBackground("#00aa00");
      },
      onblur: function () {
        this.setBackground("#777");
      },
    });
})