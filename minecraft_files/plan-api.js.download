// holds shared functions to display plan selectors and data between Minecraft & VPS plans
/**
 * Initializes plan selector panel for MC and VPS plans
 * @returns {null}
 * @param planData
 */
const initializePlanSelector = function (planData) {
  let res_status = true;

  /**
   * Generates DOM element from HTML string.
   * @param html
   * @returns {Element}
   */
  window.createElement = function createElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  /**
   * Updates/loads location container, and registers proper handlers.
   * @param planType Plan type to load locations for.
   */
  function loadLocations(planType) {
    const locationList = planData.planList[planType];
    if (!locationList) throw new Error(`Error: Plan type "${planType}" does not exist within given plan data.`);

    // hide plan list
    document.querySelector("#selectPlan").style.display = "none";

    const locationContainer = document.querySelector("#location-list");
    // iterate over locations to populate location list

    const pingTesterEl = document.querySelector(".plan-ping-test");

    // clear location list
    locationContainer.innerHTML = "";
    // load location data into container
    for (const location in locationList) {
      const locationData = planData.locationMap[location];
      if (!locationData) throw new Error(`Error: Location "${location}" does not exist as a "${planType}" location.`);
      const plans = locationList[location].plans;

      // preload flag image
      if (!locationData.flagImg) {
        const img = locationData.flagImg = new Image();
        img.src = locationData.flagIcon.imgUrl;
        img.alt = locationData.flagIcon.alt;
        img.classList.add("size-l");
      }

      let stockStatus = "Loading...";
      if (locationList[location].stocked != null && locationList[location].stocked) {
        stockStatus = "In Stock";
      } else if (locationList[location].stocked != null && !locationList[location].stocked) {
        stockStatus = "Restocking - <a class=\"accented\" href=\"https://bloom.host/waitlist\">join the waitlist!</a>";
      }

      let cardDisabled =  locationList[location].stocked ? "" : "card--plan-disabled";

      // if (!res_status) stockStatus = "<span class=\"accented-two\">Failed to load stock data.</span>";
      if (locationList[location].placeholder) {
        stockStatus = locationList[location].placeholder;
      }

      if (!res_status && locationList[location].placeholder === undefined) {
        stockStatus = "In Stock";
        cardDisabled = "";
      }


      const locationTemplate = `<div class="col card clickable ${cardDisabled}" id="${location}">
            <div class="row-mobile">
              <div class="flex-strong">
                <svg width="28" height="28" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="26" cy="26" r="26" fill="currentColor"/>
                  <path d="M40.0909 16L20.0909 36L11 26.9091" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="padd-m"></div>
              <div class="col flex-strong">
                <div class="h3 med">${locationData.title}</div>
                <div class="h5 med" stock-location="${location}">${stockStatus}</div>
              </div>
              <div class="flex-strong hide-on-mobile">
                <div id="imgPlaceholder"></div>
              </div>
            </div>
          </div>`;

      const locationEl = createElement(locationTemplate);
      locationEl.data = {};
      locationEl.data.plans = plans;

      if (!locationList[location].disabled) {
        locationEl.addEventListener("click", selectLocation);
        if (planData.selectedLocation === location) selectLocation.call(locationEl);
      }

      locationContainer.append(locationEl);
      locationEl.querySelector("#imgPlaceholder").replaceWith(locationData.flagImg);
    }

    locationContainer.append(pingTesterEl);
  }

  function createPlanElement(stockStatus, planRam, planDescriptor) {
    const planTemplate = `<div class="col card clickable ${!stockStatus ? "" : "card--disabled"}">
              <div class="row-mobile">
                <div class="flex-strong">
                  <svg width="28" height="28" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26" cy="26" r="26" fill="currentColor"/>
                    <path d="M40.0909 16L20.0909 36L11 26.9091" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="padd-m"></div>
                <div class="col flex-strong" server-ram="8GB">
                  <div class="h3 med">${planRam} GB RAM &nbsp;
                    <b class="accented-two"><small>$${planDescriptor.price}/mo.</small></b>
                  </div>
                  <div class="h5">${planDescriptor.details.join("<br>")}</div>
                  <span>${stockStatus}</span>
                </div>
              </div>
            </div>`;

    return createElement(planTemplate);
  }

  /**
   * Updates/loads plan container to include plans given, and registers proper handlers.
   * @param plans Plan list to load into plan container.
   */
  function loadPlans(plans) {
    const planContainer = document.querySelector("#plan-list");
    // clear plan list
    planContainer.innerHTML = planData?.overrides?.planContainerHtml || "";
    document.querySelector("#orderSummary").style.display = "none";

    // load plan data into container
    for (const planRam in plans) {
      const planId = plans[planRam];
      const planDescriptor = planData.planDescriptors[planData.selectedPlanType][planRam];
      const plan = planData.planMap.get(planId);

      let stockStatus;
      if (plan?.qty > 0) {
        stockStatus = "";
      } else {
        const eta = planDescriptor.details.eta;
        stockStatus = `<b>${eta ? `ETA: ${eta}` : 'Restocking'} - <a class="accented" href="https://bloom.host/waitlist">join the waitlist!</a></b>`;
      }

      // if placeholder exists on location, show placeholder as stock status
      if (planData.planList[planData.selectedPlanType][planData.selectedLocation].placeholder) {
        stockStatus = planData.planList[planData.selectedPlanType][planData.selectedLocation].placeholder;
      }

      // if (!res_status) stockStatus = "<span class=\"accented-two\">Failed to load stock data.</span>";
      if (!res_status && planData.planList[planData.selectedPlanType][planData.selectedLocation].placeholder === undefined) {
        stockStatus = "";
      }

      // In some cases, we want to append the created element
      // elsewhere, but still add the rest of the data and
      // events to it. In this case, an object is returned
      const response = createPlanElement(stockStatus, planRam, planDescriptor, planId);
      let element, append = null;
      if (response?.element) {
        element = response.element;
        append = response.append;
      } else {
        element = response;
        append = true;
      }

      if (!element) continue;

      // Allow selecting the plan if it's not out of stock
      if (!stockStatus) element.addEventListener("click", selectPlan);

      // Add plan data
      element.data = {};
      element.data.id = planId;
      element.data.ram = planRam;
      element.data.desc = planDescriptor;

      // Append to container
      if (append) planContainer.append(element);
    }

    // Show plan list
    document.querySelector("#selectPlan").style.display = "";

    // Show addon list if available
    if (window.createAddonElement !== undefined) createAddonElement(planData);
  }

  /**
   * Globally accessible function, selects performance type.
   * @param planType
   */
  window.selectPerformance = function selectPerformance(planType) {
    const btnElements = [...document.querySelectorAll(".perf-selector .btn")];
    btnElements.forEach(child => child.classList.remove("active"));
    btnElements.find(e => e.getAttribute("plan") === planType).classList.add("active");

    const perfInfos = document.querySelectorAll(".perf-descriptor.perf-active");
    perfInfos.forEach(loc => loc.classList.remove("perf-active"));

    document.querySelector(`.perf-descriptor[plan=${planType}]`).classList.add("perf-active");

    planData.selectedPlanType = planType;
    loadLocations(planType);
  };

  /**
   * Click handler for locations.
   */
  function selectLocation() {
    // abort if already selected
    if (this.classList.contains("card--selected")) return;

    planData.selectedLocation = this.id;
    document.querySelectorAll("#location-list .card.card--selected").forEach(plan => plan.classList.remove("card--selected"));
    this.classList.add("card--selected");

    loadPlans(this.data.plans);
  }

  /**
   * Click handler for plans.
   */
  function selectPlan() {
    planData.selectedPlan = this.data.id;
    document.querySelectorAll("#plan-list .card.card--selected").forEach(plan => plan.classList.remove("card--selected"));
    this.classList.add("card--selected");

    // set checkout area to proper values
    document.getElementById("checkoutBtn").href = "https://billing.bloom.host/cart.php?a=add&pid=" + this.data.id;
    document.getElementById("selectedPrice").innerHTML = this.data.desc.price;
    document.getElementById("selectedPlanTier").innerHTML = planData.levelNames[planData.selectedPlanType];
    document.getElementById("selectedRam").innerHTML = this.data.ram;

    document.getElementById("orderSummary").style.display = "flex";
  }

  /**
   * Checks if location is stocked, and updates planData values correspondingly.
   */
  window.computeStocked = function computeStocked() {
    for (const planType of Object.values(planData.planList)) {
      for (const location of Object.values(planType)) {
        if (location.disabled) continue;
        location.stocked = !!Object.values(location.plans).find((planId) => planData.planMap.get(planId)?.qty > 0);}
    }
  }

  // load function overrides
  if (planData.overrides) {
    for (const [key, value] of Object.entries(planData.overrides)) {
      eval(`${key} = value`);
    }
  }

  loadLocations(planData.selectedPlanType);

  // run async operations
  (async () => {
    try {
      const res = await fetch("https://duckstock.bloom.host/inventory");
      const output = await res.json();

      for (let item of output) {
        planData.planMap.set(item.id, item);
      }

      computeStocked();

      loadLocations(planData.selectedPlanType);
    } catch (e) {
      res_status = false;
      loadLocations(planData.selectedPlanType);
      console.error("Failed to grab stonks: ", e);
    }
  })();
  return null;
};
