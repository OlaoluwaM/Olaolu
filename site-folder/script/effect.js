class Effect {
  constructor() {
    this.elementList('.down-arrow').forEach(arr => {
      fetch('site-folder/scroll.svg').then(res => res.text().then(svg => {
        arr.innerHTML = svg;
      }))
      arr.addEventListener('click', () => {
        window.scrollTo({
          top: this.element('body').scrollHeight,
          behavior: 'smooth'
        })
      })
    })

    this.elementList('.portal').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.href !== location.href) {
          this.element('body').style = 'animation: disappear 2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;'
          setTimeout(() => {
            location.assign(event.target.href)
          }, 600);
        } else {
          event.preventDefault();
          alert('hii');
        }
      })
    })
    if (location.href.search('who-we-are.html') > -1) {
      this.element('.images').addEventListener('mouseover', event => {
        if (event.target.matches('img')) {
          popup.expandImage();
        } else {
          return
        }
      })
      this.element('.images').addEventListener('mouseout', () => {
        if (event.target.matches('img')) {
          popup.returnToNormal();
        } else {
          return
        }
      })
    }
    if (location.href.search('index.html') > -1) {
      window.onload = () => {
        this.element('.text').classList.add('hidden')
        this.element('.img').classList.add('hidden-img');
      }
      window.onscroll = () => {
        this.elementList('.hidden').forEach(elem => {
          if (this.inView(elem)) {
            elem.classList.remove('hidden');
            elem.classList.add('visible');
          }
        })

        this.elementList('.hidden-img').forEach(elem => {
          if (this.inView(elem)) {
            elem.classList.remove('hidden-img');
            elem.classList.add('visible-img');
          }
        })

      }
    }
  }
  element(elem) {
    return document.querySelector(elem);
  }
  elementList(elem) {
    return document.querySelectorAll(elem);
  }
  fetchArticle(tag) {
    fetch('Olaoluwa.github.io/site-folder/script/JSON/articles.json').then(res => res.json().then(obj => {
      popup.destructure(obj[tag])
    }))
  }
  destructure({
    title,
    content
  }) {
    let p = popup;
    p.element('.title').innerText = title;
    fetch(content).then(res => res.text().then(txt => p.element('.info').innerHTML = txt))
    console.log('Done!');
  }
  expandImage(img = event.target) {
    event.target.classList.add('current');
    popup.fetchArticle(Number(event.target.getAttribute('data-level')))
    event.currentTarget.childNodes.forEach(img => {
      if (img.nodeType === 1) {
        if (!(img.classList.contains('current'))) {
          img.classList.add('hidden')
        }
      }
    })
  }
  returnToNormal() {
    event.currentTarget.childNodes.forEach(img => {
      if (img.nodeType === 1) {
        img.classList.remove('current')
        img.classList.remove('hidden')
      }
    })
    popup.element('.title').innerHTML = 'Hover over any part of the Images to meet the members'
    popup.element('.info').innerHTML = '';
  }

  inView(el) {
    try {
      let rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        efp = function (x, y) {
          return document.elementFromPoint(x, y)
        };

      // Return false if it's not in the viewport
      if (rect.right < 0 || rect.bottom < 0 ||
        rect.left > vWidth || rect.top > vHeight) {
        console.log(false);

        return false;
      } else if (
        el.contains(efp(rect.left, rect.top)) || // If It is in the viewport
        el.contains(efp(rect.right, rect.top)) ||
        el.contains(efp(rect.right, rect.bottom)) ||
        el.contains(efp(rect.left, rect.bottom))
      ) {
        console.log(true);
        return true;
      }
    } catch (error) {
      console.log(error)
    }
  }

}
let popup = new Effect();
