const weddingInfo = {

  namaPria: "Rafi",
  namaWanita: "Alma",

  tanggal: "12 Desember 2026",
  tanggalSingkat: "12.12.2026",
  tanggalISO: "2026-12-12",

  jamMulai: "09:00",
  jamSelesai: "12:00",

  lokasi: "Kediaman Mempelai Wanita",
  kota: "Tangerang, Indonesia",

  mapsUrl:
    "https://maps.app.goo.gl/BV1hLicpQRKvGTee8",

  /*
   * GANTI dengan nomor WhatsApp tujuan RSVP.
   *
   * Contoh:
   * 081234567890
   * menjadi:
   * 6281234567890
   */
  nomorWhatsApp:
    "6289685206625",

  /*
   * GOOGLE APPS SCRIPT WEB APP
   */
  rsvpEndpoint:
    "https://script.google.com/macros/s/AKfycbwwU-Al1AH_EdW0V_N1W5LvRkrWhzQnEWblUdE6VHYiIJaZhUWYRNzzZ-0TiLtZH4l6/exec"
};


/* =====================================
   ELEMENTS
===================================== */

const body =
  document.body;

const opening =
  document.getElementById("opening");

const openInvitation =
  document.getElementById("openInvitation");

const guestNameElement =
  document.getElementById("guestName");

const rsvpPersonal =
  document.getElementById("rsvpPersonal");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const musicToggle =
  document.getElementById("musicToggle");

const musicText =
  document.getElementById("musicText");

const musicReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =====================================
   GUEST NAME
===================================== */

function getGuestName() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const guest =
    params.get("to") ||
    localStorage.getItem(
      "rafiAlmaGuestName"
    ) ||
    "Tamu Undangan";

  return guest
    .replace(/\+/g, " ")
    .trim();
}

const currentGuestName =
  getGuestName();


if (guestNameElement) {
  guestNameElement.textContent =
    currentGuestName;
}


if (rsvpPersonal) {
  rsvpPersonal.textContent =
    currentGuestName;
}


/* =====================================
   MUSIC
===================================== */

function updateMusicButton(playing) {

  if (!musicToggle) {
    return;
  }

  musicToggle.classList.toggle(
    "playing",
    playing
  );

  musicToggle.setAttribute(
    "aria-pressed",
    String(playing)
  );

  musicToggle.setAttribute(
    "aria-label",
    playing
      ? "Jeda musik"
      : "Putar musik"
  );

  if (musicText) {
    musicText.textContent =
      playing
        ? "JEDA"
        : "MUSIK";
  }
}


async function playMusic() {

  if (!backgroundMusic) {
    return false;
  }

  try {

    backgroundMusic.volume =
      0.32;

    await backgroundMusic.play();

    updateMusicButton(true);

    return true;

  } catch (error) {

    console.warn(
      "Musik tidak dapat diputar:",
      error
    );

    updateMusicButton(false);

    return false;
  }
}


function pauseMusic() {

  if (!backgroundMusic) {
    return;
  }

  backgroundMusic.pause();

  updateMusicButton(false);
}


if (openInvitation) {

  openInvitation.addEventListener(
    "click",
    async () => {

      body.classList.remove(
        "locked"
      );

      await playMusic();

      opening?.classList.add(
        "hide"
      );

      window.setTimeout(
        () => {
          opening?.remove();
        },
        900
      );

    }
  );

}


if (musicToggle) {

  musicToggle.addEventListener(
    "click",
    async () => {

      if (!backgroundMusic) {
        return;
      }

      if (backgroundMusic.paused) {
        await playMusic();
      } else {
        pauseMusic();
      }

    }
  );

}


backgroundMusic?.addEventListener(
  "play",
  () => {
    updateMusicButton(true);
  }
);


backgroundMusic?.addEventListener(
  "pause",
  () => {
    updateMusicButton(false);
  }
);


backgroundMusic?.addEventListener(
  "error",
  () => {
    updateMusicButton(false);
  }
);


/* =====================================
   COUNTDOWN
===================================== */

const countdownTarget =
  new Date(
    "2026-12-12T09:00:00+07:00"
  ).getTime();


const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


function updateCountdown() {

  const now =
    Date.now();

  let difference =
    countdownTarget - now;

  if (difference < 0) {
    difference = 0;
  }

  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );

  const hours =
    Math.floor(
      (difference /
        (1000 * 60 * 60)) %
      24
    );

  const minutes =
    Math.floor(
      (difference /
        (1000 * 60)) %
      60
    );

  const seconds =
    Math.floor(
      (difference /
        1000) %
      60
    );


  if (daysElement) {
    daysElement.textContent =
      days;
  }

  if (hoursElement) {
    hoursElement.textContent =
      String(hours)
        .padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent =
      String(minutes)
        .padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent =
      String(seconds)
        .padStart(2, "0");
  }
}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  !musicReducedMotion &&
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );
            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    element => {
      revealObserver.observe(
        element
      );
    }
  );

} else {

  revealElements.forEach(
    element => {
      element.classList.add(
        "visible"
      );
    }
  );

}


/* =====================================
   CINEMATIC PARALLAX
===================================== */

const cinematicElements =
  document.querySelectorAll(
    ".cinematic-media[data-speed]"
  );


const isTouchDevice =
  window.matchMedia(
    "(hover: none), (pointer: coarse)"
  ).matches;


let ticking = false;


function updateParallax() {

  if (
    musicReducedMotion ||
    isTouchDevice
  ) {
    return;
  }


  const viewportCenter =
    window.innerHeight / 2;


  cinematicElements.forEach(
    element => {

      const image =
        element.querySelector(
          "[data-cinematic-image]"
        );

      if (!image) {
        return;
      }


      const rect =
        element.getBoundingClientRect();


      if (
        rect.bottom < -100 ||
        rect.top >
          window.innerHeight + 100
      ) {
        return;
      }


      const speed =
        Number(
          element.dataset.speed || 0
        );


      const zoom =
        Number(
          element.dataset.zoom || 0
        );


      const elementCenter =
        rect.top +
        rect.height / 2;


      const distance =
        elementCenter -
        viewportCenter;


      const normalized =
        distance /
        Math.max(
          window.innerHeight,
          1
        );


      const translateY =
        Math.max(
          -48,
          Math.min(
            48,
            normalized *
              speed *
              -850
          )
        );


      const proximity =
        1 -
        Math.min(
          Math.abs(normalized),
          1
        );


      const scale =
        1.025 +
        zoom +
        proximity * 0.014;


      image.style.transform =
        `translate3d(0, ${translateY}px, 0) scale(${scale})`;

    }
  );


  ticking = false;
}


function requestParallaxUpdate() {

  if (ticking) {
    return;
  }

  ticking = true;

  window.requestAnimationFrame(
    updateParallax
  );
}


window.addEventListener(
  "scroll",
  requestParallaxUpdate,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  requestParallaxUpdate
);


requestParallaxUpdate();


/* =====================================
   CUSTOM CURSOR
===================================== */

const cursorDot =
  document.getElementById(
    "cursorDot"
  );

const cursorRing =
  document.getElementById(
    "cursorRing"
  );


const canUseCustomCursor =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;


if (canUseCustomCursor) {

  body.classList.add(
    "has-cursor"
  );


  let cursorX = 0;
  let cursorY = 0;

  let ringX = 0;
  let ringY = 0;


  document.addEventListener(
    "mousemove",
    event => {

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;


      if (cursorDot) {

        cursorDot.style.left =
          `${cursorX}px`;

        cursorDot.style.top =
          `${cursorY}px`;

      }

    }
  );


  function animateCursor() {

    ringX +=
      (cursorX - ringX) * 0.16;

    ringY +=
      (cursorY - ringY) * 0.16;


    if (cursorRing) {

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

    }


    window.requestAnimationFrame(
      animateCursor
    );
  }


  animateCursor();
}


/* =====================================
   GOOGLE MAPS
===================================== */

const mapsButton =
  document.getElementById(
    "mapsButton"
  );


if (mapsButton) {

  mapsButton.addEventListener(
    "click",
    () => {

      window.open(
        weddingInfo.mapsUrl,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =====================================
   CALENDAR
===================================== */

const calendarButton =
  document.getElementById(
    "calendarButton"
  );


if (calendarButton) {

  calendarButton.addEventListener(
    "click",
    () => {

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Rafi & Alma//Undangan Pernikahan//ID",
        "BEGIN:VEVENT",
        "UID:rafi-alma-2026@example.com",
        "DTSTAMP:20261004T000000Z",
        "DTSTART:20261212T090000",
        "DTEND:20261212T120000",
        "SUMMARY:Pernikahan Rafi & Alma",
        "LOCATION:Kediaman Mempelai Wanita, Tangerang, Indonesia",
        "DESCRIPTION:Undangan Pernikahan Rafi & Alma",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");


      const blob =
        new Blob(
          [icsContent],
          {
            type:
              "text/calendar;charset=utf-8"
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      link.href =
        url;

      link.download =
        "rafi-alma-12-desember-2026.ics";


      document.body.appendChild(
        link
      );


      link.click();

      link.remove();

      URL.revokeObjectURL(
        url
      );

    }
  );

}


/* =====================================
   RSVP
===================================== */

const rsvpForm =
  document.getElementById(
    "rsvpForm"
  );

const nameInput =
  document.getElementById(
    "name"
  );

const attendanceInput =
  document.getElementById(
    "attendance"
  );

const messageInput =
  document.getElementById(
    "message"
  );

const formNote =
  document.getElementById(
    "formNote"
  );


function cleanWhatsAppNumber(
  number
) {

  return String(number || "")
    .replace(/\D/g, "")
    .replace(/^0/, "62");
}


function buildWhatsAppMessage(
  nama,
  kehadiran,
  pesan
) {

  return [
    "Halo Rafi & Alma,",
    "",
    "Saya ingin mengonfirmasi kehadiran.",
    "",
    `Nama: ${nama}`,
    `Kehadiran: ${kehadiran}`,
    `Tanggal: ${weddingInfo.tanggal}`,
    `Waktu: ${weddingInfo.jamMulai} WIB — SELESAI`,
    `Lokasi: ${weddingInfo.lokasi}`,
    "",
    `Pesan: ${pesan || "-"}`
  ].join("\n");
}


/*
 * Kirim data ke Google Apps Script
 * menggunakan form POST tersembunyi.
 */
function sendRSVPToGoogleSheets(
  nama,
  kehadiran,
  pesan
) {

  return new Promise(
    resolve => {

      const iframe =
        document.createElement(
          "iframe"
        );


      iframe.name =
        `rsvpFrame_${Date.now()}`;


      iframe.style.display =
        "none";


      document.body.appendChild(
        iframe
      );


      const form =
        document.createElement(
          "form"
        );


      form.method =
        "POST";


      form.action =
        weddingInfo.rsvpEndpoint;


      form.target =
        iframe.name;


      form.style.display =
        "none";


      const fields = {
        nama,
        kehadiran,
        pesan
      };


      Object.entries(fields)
        .forEach(
          ([key, value]) => {

            const input =
              document.createElement(
                "input"
              );


            input.type =
              "hidden";

            input.name =
              key;

            input.value =
              value;


            form.appendChild(
              input
            );

          }
        );


      document.body.appendChild(
        form
      );


      form.submit();


      window.setTimeout(
        () => {

          form.remove();

          iframe.remove();

          resolve(true);

        },
        1200
      );

    }
  );
}


if (rsvpForm) {

  rsvpForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const nama =
        nameInput?.value.trim() || "";


      const kehadiran =
        attendanceInput?.value || "";


      const pesan =
        messageInput?.value.trim() || "";


      if (!nama) {

        alert(
          "Silakan isi nama terlebih dahulu."
        );

        nameInput?.focus();

        return;
      }


      if (!kehadiran) {

        alert(
          "Silakan pilih konfirmasi kehadiran."
        );

        attendanceInput?.focus();

        return;
      }


      localStorage.setItem(
        "rafiAlmaGuestName",
        nama
      );


      const submitButton =
        rsvpForm.querySelector(
          'button[type="submit"]'
        );


      const oldButtonText =
        submitButton?.textContent ||
        "Kirim via WhatsApp";


      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          "MENYIMPAN RSVP...";

      }


      if (formNote) {

        formNote.textContent =
          "Menyimpan konfirmasi kehadiran...";

      }


      /*
       * SIMPAN KE GOOGLE SHEETS
       */
      try {

        await sendRSVPToGoogleSheets(
          nama,
          kehadiran,
          pesan
        );


      } catch (error) {

        console.error(
          "Gagal mengirim RSVP:",
          error
        );

      }


      /*
       * BUKA WHATSAPP
       */
      const phone =
        cleanWhatsAppNumber(
          weddingInfo.nomorWhatsApp
        );


      const whatsappMessage =
        buildWhatsAppMessage(
          nama,
          kehadiran,
          pesan
        );


      const whatsappUrl =
        phone &&
        phone !==
          "62XXXXXXXXXX"

          ? `https://wa.me/${phone}?text=${encodeURIComponent(
              whatsappMessage
            )}`

          : "";


      /*
       * Kalau nomor WA belum diisi,
       * RSVP tetap masuk Sheet.
       */
      if (!whatsappUrl) {

        if (formNote) {

          formNote.textContent =
            "RSVP sudah dicatat. Nomor WhatsApp tujuan belum diatur.";

        }


        alert(
          "RSVP sudah dicatat ke Google Sheets.\n\n" +
          "Nomor WhatsApp tujuan belum diatur di script.js."
        );


        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.textContent =
            oldButtonText;

        }


        return;
      }


      if (formNote) {

        formNote.textContent =
          "RSVP tersimpan. Membuka WhatsApp...";

      }


      window.location.href =
        whatsappUrl;

    }
  );

}


/* =====================================
   SHARE
===================================== */

const shareButton =
  document.getElementById(
    "shareButton"
  );

const shareFeedback =
  document.getElementById(
    "shareFeedback"
  );


function showShareFeedback(
  message =
    "Link undangan berhasil disalin."
) {

  if (!shareFeedback) {
    return;
  }


  shareFeedback.textContent =
    message;


  shareFeedback.classList.add(
    "show"
  );


  window.setTimeout(
    () => {

      shareFeedback.classList.remove(
        "show"
      );

    },
    2200
  );
}


if (shareButton) {

  shareButton.addEventListener(
    "click",
    async () => {

      const shareData = {

        title:
          "Undangan Pernikahan Rafi & Alma",

        text:
          "Dengan penuh sukacita, kami mengundang Anda ke pernikahan Rafi & Alma.",

        url:
          window.location.href

      };


      if (
        navigator.share &&
        window.isSecureContext
      ) {

        try {

          await navigator.share(
            shareData
          );

          return;

        } catch (error) {

          if (
            error?.name ===
            "AbortError"
          ) {
            return;
          }

        }

      }


      try {

        await navigator.clipboard.writeText(
          window.location.href
        );

        showShareFeedback();

      } catch {

        prompt(
          "Salin link undangan ini:",
          window.location.href
        );

      }

    }
  );

}


/* =====================================
   FLOATING RSVP
===================================== */

const floatingRsvp =
  document.getElementById(
    "floatingRsvp"
  );


if (floatingRsvp) {

  floatingRsvp.addEventListener(
    "click",
    () => {

      document
        .getElementById("rsvp")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}


/* =====================================
   PREVENT IMAGE DRAG
===================================== */

document
  .querySelectorAll("img")
  .forEach(
    image => {

      image.addEventListener(
        "dragstart",
        event => {
          event.preventDefault();
        }
      );

    }
  );