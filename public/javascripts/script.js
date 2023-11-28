$(document).ready(function () {
  // Get references to DOM elements
  const menuBtn = $(".menu-btn");
  const overlay = $("#overlay");
  const menu = $("#menu");
  const dropBtn = $(".drop-btn");
  const searchInput = $("#search-bar"); // Rename searchBar to searchInput

  // Event handler for menu button click
  menuBtn.click(() => {
    menu.fadeIn(300).animate({ opacity: 1 }, 100).addClass("active");
    overlay.show();
    $("body").addClass("menu-open");
    searchInput.focus();
  });

  // Event handler for overlay click
  overlay.click(() => {
    menu.fadeOut(100).removeClass("active");
    overlay.hide();
    $("body").removeClass("menu-open");
  });

  // Hide all dropdowns initially
  $(".dropdown-content").hide();

  // Event handler for dropdown button click
  $(".drop-btn").click((event) => {
    const dropdownContents = $(event.currentTarget).siblings(
      ".dropdown-content"
    );

    $(".dropdown-content").not(dropdownContents).slideUp(200);
    dropdownContents.slideToggle(200);

    event.stopPropagation();
    event.preventDefault();
  });

  // Close dropdowns if user clicks outside of them
  $(document).click(() => {
    $(".dropdown-content").slideUp(200);
  });

  // Event handler for search input
  searchInput.on("input", function () {
    const searchTerm = searchInput.val().toLowerCase();
    const idsObj = {
      b: { text: "blog", href: "/blog" },
      t: { text: "themes", href: "/themes" },
      i: { text: "instagram", href: "/instagram" },
      x: { text: "x", href: "/x" },
      l: { text: "linkedin", href: "/linkedin" },
    };

    for (const id in idsObj) {
      const option = $(`#${id}`);
      const optionText = idsObj[id].text.toLowerCase();

      option.toggleClass("active-styles", optionText.includes(searchTerm));
    }

    if (searchInput.val() === "") {
      $(".active-styles").removeClass("active-styles");
    }
  });

  // Event handler for "Enter" key press in the search input
  searchInput.on("keydown", function (e) {
    if (e.key === "Enter") {
      const activeOption = $(".active-styles");

      if (activeOption.length > 0) {
        const href = activeOption.attr("href");
        const target = activeOption.attr("target");

        if (href && href !== "#") {
          window.open(href, target);
        } else {
          activeOption.click();
        }
      }
    }
  });

  // Dark Mode
  const theme = localStorage.getItem("theme");
  const imgModeChange = (mode) => {
    $("img").each(function () {
      let imgSrc = $(this).attr("src");
      if (imgSrc.includes(mode)) {
        let newimgSrc = imgSrc.replace(
          mode,
          mode === "light" ? "dark" : "light"
        );
        $(this).attr("src", newimgSrc);
      }
    });
    if (mode === "light") {
      $("#options .option a").css("filter", "brightness(1)");
      $("#t-mode p").text("Dark mode");
      $(".overlay").css("opacity", "0.3");
    } else if (mode === "dark") {
      $("#options .option a").css("filter", "brightness(0.4)");
      $("#t-mode p").text("Light mode");
    }
  };

  if (theme) {
    $("body").addClass("light-mode");
    imgModeChange("light");
  }

  $("#t-mode").click(function () {
    $(".dropdown-content").slideUp(200);
    $("body").toggleClass("light-mode");

    if ($("body").hasClass("light-mode")) {
      localStorage.setItem("theme", "light-mode");
      imgModeChange("light");
    } else {
      localStorage.removeItem("theme");
      imgModeChange("dark");
    }

    menu.fadeOut(100).removeClass("active");
    overlay.hide();
    $("body").removeClass("menu-open");
  });

  // Main Page - Blog Interaction
  // Hide all dropdowns initially
  $(".blog-body, .blog-footer").hide();

  // Add click event handler to all blog titles
  $(".blog-title").on("click", function () {
    const isExpanded = $(this).closest(".blog").hasClass("expanded");

    // Hide all other blog bodies and footers
    $(".blog-body, .blog-footer")
      .not($(this).siblings(".blog-body, .blog-footer"))
      .slideUp(200);
    $(".blog").removeClass("expanded");

    // Toggle the slide animation for the clicked blog-body and blog-footer
    $(this)
      .siblings(".blog-body, .blog-footer")
      .slideToggle(200, function () {
        // If both body and footer are expanded, toggle the expanded class to the clicked blog
        if ($(this).hasClass("blog-footer")) {
          $(this).closest(".blog").toggleClass("expanded");
        }
      });
  });
});
