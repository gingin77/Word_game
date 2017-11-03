let blankHolder = document.querySelector('.blanks_and_letters')

function noBlankFix () {
  console.log('noBlankFix was triggered')
  if (blankHolder.innerHTML === '') {
    console.log('blankHolder condition was met')
    makeRefreshButton()
  } else {
    console.log('alt condition was met for blankHolder');
  }
}

function makeRefreshButton () {
  let refreshForm = document.createElement('form')
  refreshForm.setAttribute('action', '/newgame')
  refreshForm.setAttribute('method', 'post')

  let refreshButton = document.createElement('button')
  refreshButton.innerText = 'start new session'
  refreshButton.setAttribute('type', 'submit')
  refreshButton.setAttribute('id', 'refresh')

  blankHolder.appendChild(refreshForm)
  refreshForm.appendChild(refreshButton)
}


// <button type="submit" name="button">submit</button>
//
// buttonnode.attachEvent('OnClick',Hi());
