const planData = {
    selectedPlan: null,
    selectedLocation: 'illinois',
    selectedPlanType: 'dedicated',
    levelNames: {
        'standard': ''
    },

    // Define locations here
    locationMap: {
        'illinois': {
            title: 'chicago, illinois',
            flagIcon: {
                imgUrl: '/flags/us.png',
                altText: 'US Flag'
            }
        }
    },

    // Define available addons here
    availableAddons: {
        'Game Panel management': {
            price: '$39/mo',
            tooltip: 'This add-on will install our custom Duck Panel game server management panel on your server. This addon includes off-site backups and the ability to manage multiple game servers through our game panel. Keep in mind that adding this add-on removes your ability to SSH/KVM into your Bare Metal Server since everything will be managed through the panel.'
        },
        'Additional IPs': {
            price: '$2/mo each',
        },
        'Additional Bandwidth': {
            price: '$19/mo per 25TB'
        },
    },

    // Define plans here
    planDescriptors: {
        'dedicated': {
            'Ryzen 5 5600X': {
                price: 99,
                details: {
                    eta: '3-5 business days',
                    series: '5000X',
                    cores: '6 Core/12 Thread',
                    memory: '64GB DDR4',
                    storage: '2x 500GB NVMe SSDs',
                    bandwidth: '30TB',
                }
            },
            'Ryzen 7 5800X': {
                price: 149,
                details: {
                    eta: '3-5 business days',
                    series: '5000X',
                    cores: '8 Core/16 Thread',
                    memory: '128GB DDR4',
                    storage: '2x 1TB NVMe SSDs',
                    bandwidth: '40TB',
                }
            },
            'Ryzen 9 5950X': {
                price: 199,
                details: {
                    eta: '3-5 business days',
                    series: '5000X',
                    cores: '16 Core/32 Thread',
                    memory: '128GB DDR4',
                    storage: '2x 2TB NVMe SSDs',
                    bandwidth: '50TB',
                }
            },
            'Ryzen 7 7700X': {
                price: 179,
                details: {
                    eta: '3-5 business days',
                    series: '7000X',
                    cores: '8 Core/16 Thread',
                    memory: '96GB DDR5',
                    storage: '2x 1TB NVMe SSDs (Gen 4)',
                    bandwidth: '40TB',
                }
            },
            'Ryzen 9 7950X - 128GB': {
                price: 249,
                details: {
                    eta: '3-5 business days',
                    series: '7000X',
                    cores: '16 Core/32 Thread',
                    memory: '128GB DDR5',
                    storage: '2x 2TB NVMe SSDs (Gen 4)',
                    bandwidth: '50TB',
                }
            },
            'Ryzen 9 7950X - 192GB': {
                price: 299,
                details: {
                    eta: '3-5 business days',
                    series: '7000X',
                    cores: '16 Core/32 Thread',
                    memory: '192GB DDR5',
                    storage: '2x 4TB NVMe SSDs (Gen 4)',
                    bandwidth: '50TB',
                }
            }
        }
    },

    // Define package IDs here
    planList: {
        'dedicated': {
            'virginia': {
                stocked: null,
                plans: {
                    'Ryzen 5 5600X': 280,
                    'Ryzen 7 5800X': 279,
                    'Ryzen 9 5950X': 278,
                    'Ryzen 7 7700X': 289,
                    'Ryzen 9 7950X - 128GB': 286,
                    'Ryzen 9 7950X - 192GB': 288,
                }
            }
        }
    },

    planMap: new Map(),
    overrides: {
        // Override the default container
        planContainerHtml: `
        <thead>
            <tr>
                <th class="select-column"></th>
                <th>CPU Model</th>
                <th>Threads/Cores</th>
                <th>Memory</th>
                <th>Storage <span class="small">(RAID-1)</span></th>
                <th>Bandwidth</th>
                <th>Price</th>
            </tr>
        </thead>`,

        // Override creating the actual element
        createPlanElement(stockStatus, planRam, planDescriptor) {
            const planContainer = document.querySelector("#plan-list");
            if (!planContainer) return;

            const details = planDescriptor.details;
            const containerId = `series-container-${details.series}`;
            let sectionParent = document.getElementById(containerId);
            if (!sectionParent) {
                sectionParent = document.createElement('tbody')
                sectionParent.id = containerId;
                sectionParent.dataset.series = details.series;
                planContainer.appendChild(sectionParent);
            }

            const element = createElement(`
            <tr class="clickable series-${details.series || 'unknown'} ${!stockStatus ? '' : 'card-disabled'}">
                <td class="select-column">
                <svg width="28" height="28" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26" cy="26" r="26" fill="currentColor"/>
                    ${!stockStatus ? `<path d="M40.0909 16L20.0909 36L11 26.9091" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
                </svg>
                </td>
                <td data-label="Model">
                    <div class="model-container">
                        <span class="model-name" data-series="${details.series || 'none'}">
                            ${planRam}
                        </span>
                        <span class="small">${stockStatus || ''}</span>
                    </div>
                </td>
                <td data-label="Cores">${details.cores || ''}</td>
                <td data-label="Memory">${details.memory || ''}</td>
                <td data-label="Storage">${details.storage || ''}</td>
                <td data-label="Bandwidth">${details.bandwidth || ''}</td>
                <td data-label="Price">$${planDescriptor.price || ''}/mo</td>
            </tr>
            `);

            sectionParent.appendChild(element);
            return {element, append: false};
        },

        // Override handling the selection
        selectPlan() {
            planData.selectedPlan = this.data.id;

            // Unselect all other items
            document.querySelectorAll('#plan-list .card-selected').forEach(plan => {
                plan.classList.remove('card-selected')
            });

            // Mark current as selected
            this.classList.add('card-selected');

            // Show order summary and checkout
            document.getElementById('checkoutBtn').href = "https://billing.bloom.host/cart.php?a=add&pid=" + this.data.id;
            document.getElementById('selectedPrice').innerHTML = this.data.desc.price;
            document.getElementById('selectedRam').innerHTML = this.data.ram;
            document.getElementById('orderSummary').style.display = 'flex';
        }
    }
};

// Insert addon list
function createAddonElement(data) {
    const addonList = document.getElementById('addon-list')
    if (!addonList) return;

    let addons = '';
    for (const [name, details] of Object.entries(data.availableAddons)) {
        addons += `
        <li>
            <span class="tooltip">
                ${name}
                ${details.tooltip ? `<b>(?)</b> <span class="tooltiptext">${details.tooltip}</span>` : ''}
            </span>
            <span class="accented price">${details.price}</span>
        </li>
        `;
    }

    if (!addons) return;

    addonList.innerHTML = `
      <div class="h4 med accented-gradient-text-two">Available add-ons:</div>
      <ul className="h7">
        ${addons}
      </ul>
    `;
}

// Initialize everything
(() => {
    initializePlanSelector(planData);

    // Check for plan type in url
    const planType = location.search.slice(1);
    if (Object.keys(planData.planList).includes(planType)) {
        document.querySelector(`button[plan=${planType}]`).onclick();
    }
})();
