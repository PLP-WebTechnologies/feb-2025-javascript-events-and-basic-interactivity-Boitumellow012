// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const exploreBtn = document.getElementById("explore-btn");
const postsContainer = document.getElementById("posts-container");
const newsletterForm = document.getElementById("newsletter-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const formSuccess = document.getElementById("form-success");
const tipButtons = document.querySelectorAll(".tip-btn");

// Sample posts data
const postsData = [
  {
    title: "Minimalist Urban Apartment",
    description:
      "Discover how to maximize small spaces with smart minimalist design.",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    likes: 124,
  },
  {
    title: "Scandinavian Countryside Home",
    description:
      "Warm wood tones and natural light define this beautiful Scandinavian retreat.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    likes: 89,
  },
  {
    title: "Modern Industrial Loft",
    description:
      "Raw materials meet contemporary design in this stunning industrial space.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    likes: 156,
  },
];

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// Explore button functionality
exploreBtn.addEventListener("click", () => {
  window.scrollTo({
    top: document.querySelector(".featured-posts").offsetTop - 80,
    behavior: "smooth",
  });
});

// Render posts to the DOM
function renderPosts() {
  postsContainer.innerHTML = "";
  postsData.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";
    postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <button class="like-btn">
                    <i class="far fa-heart"></i>
                    <span>${post.likes} Likes</span>
                </button>
            </div>
        `;
    postsContainer.appendChild(postCard);
  });

  // Add event listeners to like buttons
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const countSpan = this.querySelector("span");
      let likes = parseInt(countSpan.textContent);

      if (this.classList.contains("liked")) {
        likes--;
        icon.classList.remove("fas");
        icon.classList.add("far");
        this.classList.remove("liked");
      } else {
        likes++;
        icon.classList.remove("far");
        icon.classList.add("fas");
        this.classList.add("liked");
      }

      countSpan.textContent = `${likes} Likes`;
    });
  });
}

// Form validation
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Name must be at least 2 characters";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Please enter a valid email";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // If form is valid
  if (isValid) {
    formSuccess.textContent = `Thank you, ${nameInput.value.trim()}! You've been subscribed.`;
    formSuccess.style.display = "block";
    newsletterForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 5000);
  }
});

// Interactive design tips
tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const tipCard = this.closest(".tip-card");
    const tipContent = tipCard.querySelector(".tip-content");

    if (this.textContent === "Show More") {
      if (tipCard.id === "tip1") {
        tipContent.innerHTML = `
                    <strong>Ways to maximize natural light:</strong>
                    <ul>
                        <li>Use sheer window treatments</li>
                        <li>Place mirrors opposite windows</li>
                        <li>Choose light-colored walls</li>
                        <li>Keep window glass clean</li>
                        <li>Use glass doors where possible</li>
                    </ul>
                `;
      } else {
        tipContent.innerHTML = `
                    <strong>Space-saving solutions:</strong>
                    <ul>
                        <li>Built-in storage under stairs</li>
                        <li>Wall-mounted folding tables</li>
                        <li>Multi-functional furniture</li>
                        <li>Vertical shelving units</li>
                        <li>Hidden storage compartments</li>
                    </ul>
                `;
      }
      this.textContent = "Show Less";
    } else {
      if (tipCard.id === "tip1") {
        tipContent.textContent =
          "Click to learn how to enhance your space with lighting";
      } else {
        tipContent.textContent = "Click to discover smart storage ideas";
      }
      this.textContent = "Show More";
    }
  });
});
