
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=663559734&single=true&output=csv";

async function loadImagesFromCSV() {
  const res = await fetch(csvUrl);
  const csv = await res.text();
  const lines = csv.trim().split('\n').slice(1); // Skip header row

  const carousel = document.getElementById("image-carousel");
  const dotNav = document.getElementById("dot-nav");

  const slides = [];

  lines.forEach((line, index) => {
    const imgURL = line.replace(/"/g, "").trim();

    const slide = document.createElement("div");
    slide.className = `absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === 0 ? "opacity-100" : "opacity-0"}`;
    slide.style.backgroundImage = `url('${imgURL}')`;
    slide.id = `slide-${index}`;

    // Black overlay
    const overlay = document.createElement("div");
    overlay.className = "absolute inset-0 bg-black opacity-60";
    slide.appendChild(overlay);

    carousel.insertBefore(slide, carousel.firstChild);
    slides.push(slide);

    // Dot button
    const dot = document.createElement("button");
    dot.className = `w-3 h-3 bg-white rounded-full ${index === 0 ? "opacity-100" : "opacity-50"} transition duration-300`;
    dot.addEventListener("click", () => showSlide(index));
    dotNav.appendChild(dot);
  });

  const dots = dotNav.querySelectorAll("button");
  let currentIndex = 0;

  function showSlide(index) {
    slides[currentIndex].classList.replace("opacity-100", "opacity-0");
    dots[currentIndex].classList.replace("opacity-100", "opacity-50");

    slides[index].classList.replace("opacity-0", "opacity-100");
    dots[index].classList.replace("opacity-50", "opacity-100");

    currentIndex = index;
  }

  setInterval(() => {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }, 5000); // Change slide every 5 seconds
}

document.addEventListener("DOMContentLoaded", loadImagesFromCSV);


  
  
  /**NEWWWWWWWWWWWWWWWSSSSSSSSSSSSS SECTTOIIIIIIIIIIIIOOOOOONNNNNNN */
  
  const sheetCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=689281765&single=true&output=csv";

  async function fetchNews() {
    const response = await fetch(sheetCSV);
    const text = await response.text();
    const rows = text.trim().split("\n").slice(1); // skip header

    const newsContainer = document.getElementById("news-container");

    // Original list
    const items = [];

    rows.forEach(row => {
      const [title, imageLink, contentLink] = row.split(",");

      const div = document.createElement("div");
      div.className = "news-item";

      div.innerHTML = `
        <h4 class="font-semibold text-white mb-2">${title}</h4>
        ${imageLink.startsWith("http") ? `<img src="${imageLink}" alt="${title}">` : ""}
        <a href="${contentLink}" target="_blank">Read more</a>
      `;

      items.push(div);
      newsContainer.appendChild(div);
    });

    // Clone all for smooth infinite loop
    items.forEach(clone => {
      newsContainer.appendChild(clone.cloneNode(true));
    });
  }

  fetchNews();


/** TTTTTTTTTTTTTTTTTTEEEEEESSSSSSSSSSSSSSSTTTTTTTIIIIIIIIIIOMONIALLLL */

const testimonialCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=106720986&single=true&output=csv";

  function generateStars(rating) {
    const r = parseInt(rating);
    return '⭐'.repeat(r) + '☆'.repeat(5 - r);
  }

  async function fetchTestimonials() {
    try {
      const response = await fetch(testimonialCSV);
      const text = await response.text();
      const rows = text.trim().split("\n").slice(1); // Skip header

      const testimonials = rows.map(row => {
        const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
        const parts = [...row.matchAll(regex)].map(match =>
          match[0].replace(/^"|"$/g, "").trim()
        );
        const [timestamp, company, message, rating, date] = parts;
        return {
          company,
          message,
          rating: parseInt(rating),
          date
        };
      }).filter(t => !isNaN(t.rating));

      if (testimonials.length > 0) {
        startTestimonialSlider(testimonials);
      } else {
        document.getElementById("testimonial-container").innerHTML = `<p>No testimonials found.</p>`;
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      document.getElementById("testimonial-container").innerHTML = `<p class="text-red-400">Failed to load testimonials.</p>`;
    }
  }

  function startTestimonialSlider(data) {
    const container = document.getElementById("testimonial-container");
    let index = 0;

    function showTestimonial(i) {
      const t = data[i];
      container.innerHTML = `
        <div class="text-center">
          <h4 class="text-xl font-semibold mb-1">${t.company}</h4>
          <div class="text-yellow-400 text-lg mb-2">${generateStars(t.rating)}</div>
          <p class="italic text-gray-200">"${t.message}"</p>
          <p class="text-xs mt-2 text-gray-400">${t.date}</p>
        </div>
      `;
    }

    showTestimonial(index);

    setInterval(() => {
      index = (index + 1) % data.length;
      showTestimonial(index);
    }, 4000);
  }

  fetchTestimonials();

  /** vvvvvvvvvvvvvvIIIIIIIIIIDDDDDDDDDDDDDDDDDDIIIIIIIIIIOOOOOOOOOO */

  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=844222759&single=true&output=csv";

  async function loadVideos() {
    try {
      const res = await fetch(sheetURL);
      const csvText = await res.text();
      const rows = csvText.trim().split("\n").slice(1); // Skip the header row
      const container = document.getElementById("video-grid");

      rows.forEach(row => {
        const link = row.trim().replace(/"/g, ''); // Clean quotes if any

        if (link.includes("youtube.com/embed")) {
          const videoCard = `
            <div class="video-card w-full max-w-sm">
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
                <iframe src="${link}" allowfullscreen class="w-full h-full"></iframe>
              </div>
            </div>
          `;
          container.insertAdjacentHTML("beforeend", videoCard);
        }
      });
    } catch (err) {
      console.error("Error loading video links from Google Sheet:", err);
    }
  }

  loadVideos();

  /**GALLLLLLLLLERYYYYYYYYYYY */

  const photoSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=1055470680&single=true&output=csv";

  async function loadPhotos() {
    try {
      const res = await fetch(photoSheetURL);
      const csvText = await res.text();
      const rows = csvText.trim().split("\n").slice(1); // Skip header

      const container = document.getElementById("photo-grid");

      rows.forEach(link => {
        const cleanLink = link.trim().replace(/"/g, '');
        const img = `
          <div class="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="${cleanLink}" alt="Gallery Image" class="w-full h-48 object-cover">
          </div>
        `;
        container.insertAdjacentHTML("beforeend", img);
      });
    } catch (err) {
      console.error("Error loading gallery photos:", err);
    }
  }

  loadPhotos();


  /**OURRRRRRRRRRRRRRRRR LASTEEEEEEEEEEEETTTTTTTTT PRJECTTTTTTT */

   const latestProjectsSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=2011070991&single=true&output=csv";

  async function loadProjects() {
    const res = await fetch(latestProjectsSheet);
    const csv = await res.text();
    const rows = csv.trim().split("\n").slice(1); // skip headers

    const projectContainer = document.querySelector("#portfolio .grid");
    projectContainer.innerHTML = ""; // clear any default content

    rows.forEach(row => {
      const [imgLink, companyName, product, website] = row.split(",").map(col => col.replace(/"/g, '').trim());

      const card = `
        <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden group transform hover:scale-105 transition duration-300 ease-in-out">
          <div class="relative overflow-hidden">
            <img src="${imgLink}" alt="${companyName}" class="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div class="absolute bottom-4 left-4 text-white p-2">
              <h3 class="text-2xl font-bold">${companyName}</h3>
              <p class="text-gray-300 text-sm">${product}</p>
            </div>
          </div>
          <div class="p-6">
            <a href="${website}" target="_blank" class="btn-primary text-sm px-6 py-2">View Website</a>
          </div>
        </div>`;
      projectContainer.insertAdjacentHTML("beforeend", card);
    });
  }

  loadProjects();

  /** gggggggggogleeeeeeeeeeeee reviieeeeeeeeeewwwwwwww */


function generateStars(rating) {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
}

// CSV-safe line parsing (handles quoted commas properly)
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const header = lines[0].split(",");
  const rows = lines.slice(1);

  const data = [];

  for (let line of rows) {
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    const cells = [...line.matchAll(regex)].map(match => match[0].replace(/^"|"$/g, '').trim());

    if (cells.length < 5) continue;

    const [timestamp, name, message, ratingRaw, date] = cells;
    const rating = parseInt(ratingRaw);

    if (!isNaN(rating) && rating >= 1 && rating <= 5) {
      data.push({ name, message, rating, date });
    }
  }

  return data;
}

async function loadGoogleReviews() {
  try {
    const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=106720986&single=true&output=csv");
    const text = await res.text();
    const reviews = parseCSV(text);

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : "0.0";
    const avgStars = generateStars(Math.round(avgRating));

    document.getElementById("avg-rating").innerText = avgStars;
    document.getElementById("avg-score").innerText = `(${avgRating})`;
    document.getElementById("total-reviews").innerText = reviews.length;

    const list = document.getElementById("reviews-list");
    list.innerHTML = "";

    reviews.reverse().forEach(r => {
      list.insertAdjacentHTML("beforeend", `
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-100 dark:border-gray-600">
          <div class="flex items-center mb-3">
            <h4 class="font-semibold text-lg text-gray-900 dark:text-white">${r.name}</h4>
            <div class="flex items-center text-yellow-500 text-base mb-1 ml-auto">
              ${generateStars(r.rating)}
              <span class="text-gray-500 dark:text-gray-400 text-xs ml-3">${r.date}</span>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 text-base">${r.message}</p>
        </div>
      `);
    });
  } catch (e) {
    console.error("Failed to load reviews:", e);
    document.getElementById("reviews-list").innerHTML = `<p class="text-red-500">Unable to load reviews.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadGoogleReviews);

/** CLIENTTTTTTTTTTTTTTT LOGOSSSSSSSSSSSSSSSSSSSSS */

const marqueeContainer = document.getElementById('logoMarquee');
  const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0pxsk37_S0rxY6LM81HpTDt8ZzMv52eyKmmFRI4YHobycKyU_OGwJtPrstm7vuL5fsdh_AyxL9_ni/pub?gid=1520896835&single=true&output=csv';

  async function loadClientLogos() {
    try {
      const res = await fetch(csvURL);
      const data = await res.text();
      const rows = data.split('\n').slice(1); // Skip header

      const logos = rows.map(row => {
        const url = row.trim();
        if (!url) return '';
        return `
          <div class="flex-shrink-0 w-40 h-24 flex items-center justify-center p-4">
            <img src="${url}" alt="Client Logo" class="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition duration-300">
          </div>
        `;
      }).filter(Boolean).join('');

      marqueeContainer.innerHTML = logos + logos; // Duplicate for infinite scroll
    } catch (e) {
      console.error('Failed to load client logos:', e);
      marqueeContainer.innerHTML = '<p class="text-white text-center w-full">Failed to load client logos.</p>';
    }
  }

  loadClientLogos();