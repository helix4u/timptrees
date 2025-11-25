// Simple review slider and theme toggle
(function () {
  const reviews = [
    {
      name: "Dustin C. — Provo",
      text: "These guys really knew their stuff. I felt confident even with a very large tree that was too close to my house. Friendly, timely, and a fair price. Great guys!",
      stars: 5
    },
    {
      name: "Larry — Provo",
      text: "I am extremely grateful to Casey for removing a large, dead pine tree between my carport and neighbor's fence. I had anxieties over possible problems due to such tight quarters, yet the branches and trunk were removed without incident. Casey is very knowledgeable in many aspects of tree care services. The price was very reasonable. Cleanup was fantastic also.",
      stars: 5
    },
    {
      name: "Charlene H. — Orem",
      text: "They arrived on time and were very knowledgeable about trees. They cut down a 76 foot Poplar and a 60 foot Aspen in a well thought out manner that was safe. Casey was very friendly and answered all the questions we had. They cleaned up all the tree debris and cuttings so well that you wouldn't know that they had been there. The price charged was very reasonable.",
      stars: 5
    },
    {
      name: "Sarah B. — Provo",
      text: "Timp Trees came out and cut down trees and trimmed up my blue spruce. They were very professional, safe and did an excellent job. Also very reasonably priced. Definitely recommend them.",
      stars: 5
    },
    {
      name: "Hayden S. — Pleasant Grove",
      text: "Timp trees did an amazing job. I really look forward to doing more business with them in the future. He was super friendly and very professional. I recommend them to everyone!",
      stars: 5
    },
    {
      name: "Lindsay A. — Logan",
      text: "Timp Trees did a fantastic job of removing several tall dead trees for us and making all the trees around our property healthy. The trees were next to our garden and he made sure to take extra care and not damage anything in the process. They even cleaned up the sawdust that fell on the yard. Plus, they hauled everything away, and cleaned up our property better than it was when they arrived.",
      stars: 5
    }
  ];

  const slideText = document.querySelector("[data-review-text]");
  const slideName = document.querySelector("[data-review-name]");
  const slideStars = document.querySelector("[data-review-stars]");
  const dotsContainer = document.querySelector("[data-slider-dots]");

  if (slideText && slideName && slideStars && dotsContainer) {
    reviews.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (idx === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Show review ${idx + 1}`);
      dot.addEventListener("click", () => setReview(idx));
      dotsContainer.appendChild(dot);
    });

    let current = 0;
    const setReview = (index) => {
      current = index;
      const r = reviews[index];
      slideText.textContent = r.text;
      slideName.textContent = r.name;
      slideStars.textContent = "★★★★★".slice(0, r.stars);
      [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    };

    setReview(0);

    setInterval(() => {
      const next = (current + 1) % reviews.length;
      setReview(next);
    }, 5000);
  }

  // Auto-fill subject line for bid form based on property type
  const propertySelect = document.querySelector("#propertyType");
  const messageField = document.querySelector("#projectDetails");
  if (propertySelect && messageField) {
    propertySelect.addEventListener("change", () => {
      if (!messageField.value) {
        const type = propertySelect.value || "Residential";
        messageField.value = `${type} tree service request: trimming, removal, or maintenance needed.`;
      }
    });
  }

  // Mailto handlers to send quick emails without backend
  const MAILTO_ADDRESS = "services@timptrees.com";

  function wireMailto(formId, buildBody) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { subject, body } = buildBody(form);
      const mailto = `mailto:${MAILTO_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }

  wireMailto("quickBidForm", (form) => {
    const type = form.propertyType.value;
    const service = form.serviceType.value;
    const details = form.projectDetails.value;
    const contact = form.contact.value;
    return {
      subject: `Bid request: ${type} - ${service}`,
      body: `Property type: ${type}\nService: ${service}\nDetails: ${details}\nContact: ${contact}\n\nSent from Timp Trees.`
    };
  });

  wireMailto("commercialForm", (form) => {
    const company = form.company.value;
    const kind = form.propertyKind.value;
    const sites = form.locations.value;
    const need = form.need.value;
    const timeline = form.timeline.value;
    const contact = form.contactMethod.value;
    const notes = form.notes.value;
    return {
      subject: `Business & Commercial inquiry: ${company || kind}`,
      body: `Company/Property: ${company}\nType: ${kind}\nSites: ${sites}\nService needed: ${need}\nTimeline: ${timeline}\nContact: ${contact}\nNotes: ${notes}\n\nSent from Timp Trees.`
    };
  });
})();

// Theme toggle
(function () {
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  if (!toggle) return;

  const saved = localStorage.getItem("tt-theme");
  if (saved) root.setAttribute("data-theme", saved);

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", current);
    localStorage.setItem("tt-theme", current);
  });
})();
