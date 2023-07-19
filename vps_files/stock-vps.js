const planData = {

  selectedPlan: null,
  selectedLocation: null,
  selectedPlanType: "plus",
  levelNames: {
    "standard": "Performance",
    "plus": "Performance+"
  },
  locationMap: {
    "california": {
      title: "Los Angeles, California",
      flagIcon: {
        imgUrl: "/flags/us.png",
        altText: "US Flag"
      }
    },
    "miami": {
      title: "Miami, Florida",
      flagIcon: {
        imgUrl: "/flags/us.png",
        altText: "US Flag"
      }
    },
    "germany": {
      title: "Falkenstein, Germany",
      flagIcon: {
        imgUrl: "/flags/de.png",
        altText: "US Flag"
      }
    },
    "singapore": {
      title: "Singapore",
      flagIcon: {
        imgUrl: "/flags/singapore.png",
        altText: "Singapore Flag"
      }
    }
  },
  planDescriptors: {
    "standard": {
      "4": {
        price: 11,
        details: ["1 Dedicated Logical Cores", "Ryzen 9 3950X", "60GB NVMe SSD Storage", "2TB Transfer"]
      },
      "8": {
        price: 22,
        details: ["2 Dedicated Logical Cores", "Ryzen 9 3950X", "120GB NVMe SSD Storage", "4TB Transfer"]
      },
      "12": {
        price: 33,
        details: ["3 Dedicated Logical Cores", "Ryzen 9 3950X", "180GB NVMe SSD Storage", "6TB Transfer"]
      },
      "16": {
        price: 44,
        details: ["4 Dedicated Logical Cores", "Ryzen 9 3950X", "240GB NVMe SSD Storage", "8TB Transfer"]
      },
      "20": {
        price: 55,
        details: ["5 Dedicated Logical Cores", "Ryzen 9 3950X", "300GB NVMe SSD Storage", "10TB Transfer"]
      },
      "24": {
        price: 66,
        details: ["6 Dedicated Logical Cores", "Ryzen 9 3950X", "360GB NVMe SSD Storage", "12TB Transfer"]
      }
    },
    "plus": {
      "4": {
        price: 13,
        details: ["1 Dedicated Logical Cores", "Ryzen 9 5950X", "60GB NVMe SSD Storage", "2TB Transfer"]
      },
      "8": {
        price: 26,
        details: ["2 Dedicated Logical Cores", "Ryzen 9 5950X", "120GB NVMe SSD Storage", "4TB Transfer"]
      },
      "12": {
        price: 39,
        details: ["3 Dedicated Logical Cores", "Ryzen 9 5950X", "180GB NVMe SSD Storage", "6TB Transfer"]
      },
      "16": {
        price: 52,
        details: ["4 Dedicated Logical Cores", "Ryzen 9 5950X", "240GB NVMe SSD Storage", "8TB Transfer"]
      },
      "20": {
        price: 65,
        details: ["5 Dedicated Logical Cores", "Ryzen 9 5950X", "300GB NVMe SSD Storage", "10TB Transfer"]
      },
      "24": {
        price: 78,
        details: ["6 Dedicated Logical Cores", "Ryzen 9 5950X", "360GB NVMe SSD Storage", "12TB Transfer"]
      }
    }
  },
  planList: {
    "standard": {
      "virginia": {
        stocked: null,
        plans: {
          4: 156,
          8: 114,
          12: 157,
          16: 116,
          20: 118,
          24: 119
        }
      },
      "texas": {
        stocked: null,
        plans: {
          4: 158,
          8: 124,
          12: 159,
          16: 126,
          20: 128,
          24: 129
        }
      },
      // Germany
      "california": {
        stocked: null,
        plans: {
          4: 198,
          8: 199,
          12: 200,
          16: 201,
          20: 202,
          24: 203
        }
      },
      "miami": {
        disabled: true,
        placeholder: "Only available for <span class='accented-gradient-text' onclick='selectPerformance(\"plus\")'>Performance+</span> Plans"
      },
      "germany": {
        disabled: true,
        placeholder: "Only available for <span class='accented-gradient-text' onclick='selectPerformance(\"plus\")'>Performance+</span> Plans"
      },
      "singapore": {
        disabled: true,
        placeholder: "Only available for <span class='accented-gradient-text' onclick='selectPerformance(\"plus\")'>Performance+</span> Plans"
      }
    },
    "plus": {
      "virginia": {
        stocked: null,
        plans: {
          4: 163,
          8: 164,
          12: 165,
          16: 166,
          20: 167,
          24: 168
        }
      },
      "texas": {
        stocked: null,
        plans: {
          4: 179,
          8: 180,
          12: 181,
          16: 182,
          20: 183,
          24: 184
        }
      },
      "california": {
        stocked: null,
        plans: {
          4: 204,
          8: 205,
          12: 206,
          16: 207,
          20: 208,
          24: 209
        }
      },
      "miami": {
        stocked: null,
        plans: {
          4: 249,
          8: 250,
          12: 251,
          16: 252,
          20: 253,
          24: 254
        }
      },
      "germany": {
        stocked: null,
        plans: {
          4: 150,
          8: 151,
          12: 152,
          16: 153,
          20: 154,
          24: 155
        }
      },
      "singapore": {
        stocked: null,
        plans: {
          4: 269,
          8: 270,
          12: 271,
          16: 272,
          20: 273,
          24: 274
        }
      }
        }
      },
  planMap: new Map()
};

initializePlanSelector(planData);

(() => {
  // check for plan type in url
  const planType = location.search.slice(1);
  if (Object.keys(planData.planList).includes(planType)) {
    document.querySelector(`button[plan=${planType}]`).onclick();
  }
})();
