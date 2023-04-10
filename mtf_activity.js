let acc = 0;
let expiryTime = new Date("2023-02-01T00:00:00.0Z");
let cancel = false;
let page_mins = 0;

function doFunny() {
  const liSecs = [
    ...document.querySelectorAll(
      '[aria-label="activity-logs, [S9] - UTILITY"]'
    ),
  ];

  liSecs.forEach((element, index, array) => {
    [...element.getElementsByTagName("li")].forEach(
      (log, subIndex, subArray) => {
        const timeOfThis = new Date(
          [...log.getElementsByTagName("time")][0].getAttribute("datetime")
        );

        if (timeOfThis.getTime() < expiryTime.getTime() || cancel) {
          cancel = true;

          alert(acc + " Minutes")
          // fetch(
          //   "https://discord.com/api/webhooks/1094991463235977338/WwB8UL6qx-EAaBdddHAXBttyWoMRUi61UvTtakpKdom8dB8TinbWebqXN3bclOwIJAYk",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //       "origin": "https://discord.com"
          //     },
          //     body: `{"username": "Activity Calculator", "avatar_url": "https://cdn.discordapp.com/attachments/1094991444630044713/1094992290218516580/dmp-modern-bg-shrunk.png","content": "**${document.querySelector('span[data-text="true"]'.innerHTML)}** ${acc} Minutes"}`
          //   }
          // );
        } else {
          parseLog(log, subIndex, subArray, index, array);
        }
      }
    );
  });
}

function parseLog(log, index, array, mainIndex, mainArray) {
  const tgt = log.querySelector('[style="grid-column: 5 / 9;"');

  if (tgt) {
    const nextEl = tgt.children[1];
    acc += parseInt(nextEl.innerHTML);
    page_mins += parseInt(nextEl.innerHTML);
  }

  if (mainIndex == mainArray.length - 1 && index == array.length - 1) {
    let founded = setInterval(() => {
      const thingy = document.querySelector('[rel="next"]');

      if (thingy) {
        clearInterval(founded);
        page_mins = 0;
        thingy.click();
      }
    }, 1000);

    let checkIfItLoaded = setInterval(() => {
      if (
        document.querySelectorAll(
          '[aria-label="activity-logs, [S9] - UTILITY"]'
        )
      ) {
        clearInterval(checkIfItLoaded);
        setTimeout(doFunny, 2000);
      }
    }, 5);
  }
}

doFunny();
