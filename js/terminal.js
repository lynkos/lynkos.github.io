// Write text to a target element
function writeText(target, content) {
  // Loop through array of content characters
  return new Promise((resolve) => {
    // Make an array of the specified content
    const contentArray = content.split('')

    // Keep track of the character currently being written
    let current = 0

    while (current < contentArray.length) {
      ;((curr) => {
        setTimeout(() => {
          target.innerHTML += contentArray[curr]

          // Scroll to the bottom of the screen unless scroll is false
          var terminalBody = document.getElementById("terminal-body")
          terminalBody.scrollTop = terminalBody.scrollHeight
          
          // Resolve the promise once the last character is written
          if (curr === contentArray.length - 1) resolve()
        })
      }) (current++)
    }
  })
}
// Handle keypresses on the document, printing them to an
// 'input' span. Input content will be interpreted as a
// command and output will be written to an output element
function handleKeypress(e, input, output) { 
  // Check if a certain type of element has focus that we do not
  // want to do keypress handling on (such as form inputs)  
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "BUTTON") {
    // Enter clears the input and executes the command
    if (e.key === 'Enter') {
      const command = input.innerText
      input.innerHTML = ''

      // reprint the entered command
      output.innerHTML += `<div class="body__row" style="padding: 0">
                           <span class="body__row-arrow"></span>
                           <span class="body__row-name">lynkos</span><span class="body__row-accent">&commat;</span>
                           <span class="body__row-git--label">localhost</span><span class="body__row-accent">:</span>
                           <span class="body__row-git--branch">~</span><span class="body__row-accent">$</span>
                           <span class="body__row-result">` + command + `</span>
                           </div>`
      writeText(output, execute(command))
    }

    // Backspace causes last character to be erased
    else if (e.key === 'Backspace') {
      input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1)
    }

    // TODO Refactor into a function; use switch-case
    // Do nothing for these keys
    else if ((e.key === 'Tab') || (e.key === 'Shift') || (e.key === 'CapsLock') || (e.key === 'Control') || (e.key === 'Alt') || (e.key === 'Meta') || (e.key === 'Escape') || (e.key === 'ArrowUp') || (e.key === 'ArrowDown') || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight')) { }

    // For any other key, print the keystroke to the prompt
    else input.insertAdjacentText('beforeend', e.key)
  }
  
  // Accept a command, execute it, and return any output
  function execute(command) {
    switch(command.toLowerCase()) {
      case '':
        return ''

      case 'clear':
        document.getElementById("clearable").style.display = 'none'
        output.innerHTML = ''
        return ''

      case 'ls':
        return `.                          .wine
..                         .vim
.Trash                     .viminfo
.bash_history              .vscode
.bash_profile              Applications
.bash_sessions             Desktop
.bashrc                    Documents
.cache                     Downloads
.conda                     Games
.config                    Library
.gitconfig                 Movies
.github                    Music
.pip                       Pictures
.profile                   Public
.python_history            miniconda3
.ssh`

      case 'help':
        return `Enter a valid command:

help   this help text
clear  clear the screen
ls     display contents of current directory`

      default:
        return '-bash: ' + command + ': command not found'
    }
  }  
}

// Execute page loading asynchronously once content has loaded
document.addEventListener('DOMContentLoaded', async () => {  
  const input = document.getElementById('command-input')
  const output = document.getElementById('output')
  document.addEventListener('keydown', (e) => handleKeypress(e, input, output))
})