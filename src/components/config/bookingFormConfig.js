// bookingFormConfig.js

const bookingFormConfig = {
  // Cleaning and Services
  101: {
    serviceOptions: ["Full Home", "Kitchen Only", "Bathroom Only"],
    equipments: [
      { name: "Vacuum Cleaner", price: 500 },
      { name: "Mop & Bucket", price: 200 }
    ],
    extraFields: [
      {
        name: "frequency",
        label: "Cleaning Frequency",
        type: "radio",
        options: ["One-time", "Weekly", "Monthly"]
      }
    ]
  },
  102: {
    serviceOptions: ["Sofa", "Carpet", "Both"],
    equipments: [
      { name: "Steam Cleaner", price: 600 },
      { name: "Shampoo Solution", price: 300 }
    ],
    extraFields: [
      {
        name: "material",
        label: "Fabric Type",
        type: "radio",
        options: ["Leather", "Cotton", "Synthetic"]
      }
    ]
  },
  103: {
    serviceOptions: ["Basic Clean", "Deep Clean"],
    equipments: [{ name: "Disinfectant", price: 150 }],
    extraFields: []
  },
  104: {
    serviceOptions: ["Basic Clean", "Deep Clean", "Chimney Clean"],
    equipments: [{ name: "Degreaser", price: 200 }],
    extraFields: []
  },
  105: {
    serviceOptions: ["Overhead Tank", "Underground Tank"],
    equipments: [{ name: "Pump Machine", price: 300 }],
    extraFields: []
  },
  106: {
    serviceOptions: ["Cockroach", "Termite", "Rodent", "Bed Bugs"],
    equipments: [{ name: "Protective Gear", price: 250 }],
    extraFields: [
      {
        name: "area",
        label: "Approximate Area",
        type: "text"
      }
    ]
  },
  108: {
    serviceOptions: ["Wood", "Metal", "Upholstered"],
    equipments: [{ name: "Polish Kit", price: 300 }],
    extraFields: []
  },

  // Repair and Maintenance
  201: {
    serviceOptions: ["Cooling Issue", "Water Leakage", "No Power"],
    equipments: [{ name: "Gas Refill", price: 1500 }],
    extraFields: [
      {
        name: "warranty",
        label: "Under Warranty?",
        type: "radio",
        options: ["Yes", "No"]
      }
    ]
  },
  202: {
    serviceOptions: ["Leak Fix", "Tap Installation", "Pipe Replacement"],
    equipments: [{ name: "Sealant", price: 150 }],
    extraFields: []
  },
  203: {
    serviceOptions: ["Wiring Issue", "Switch Replacement", "Appliance Connection"],
    equipments: [{ name: "Tester Kit", price: 200 }],
    extraFields: []
  },
  204: {
    serviceOptions: ["Refrigerator", "Washing Machine", "Microwave", "Other"],
    equipments: [],
    extraFields: [
      {
        name: "brand",
        label: "Appliance Brand",
        type: "text"
      }
    ]
  },
  205: {
    serviceOptions: ["Furniture Repair", "Custom Build"],
    equipments: [{ name: "Wood Cutter", price: 400 }],
    extraFields: []
  },
  206: {
    serviceOptions: ["Filter Change", "Full Servicing"],
    equipments: [{ name: "Spare Filters", price: 500 }],
    extraFields: []
  },
  207: {
    serviceOptions: ["Battery Replacement", "Inverter Repair"],
    equipments: [],
    extraFields: []
  },

  // Home Improvement
  301: {
    serviceOptions: ["Interior", "Exterior", "Both"],
    equipments: [{ name: "Ladder", price: 200 }],
    extraFields: [
      {
        name: "paintType",
        label: "Paint Type",
        type: "radio",
        options: ["Oil-based", "Water-based"]
      }
    ]
  },
  302: {
    serviceOptions: ["Tile Installation", "Tile Repair", "Wood Flooring"],
    equipments: [],
    extraFields: []
  },
  303: {
    serviceOptions: ["Full Room", "Partial"],
    equipments: [],
    extraFields: []
  },
  304: {
    serviceOptions: ["Crack Repair", "Waterproofing"],
    equipments: [],
    extraFields: []
  },
  305: {
    serviceOptions: ["Full Kitchen", "Partial"],
    equipments: [],
    extraFields: []
  },

  // Outdoor
  401: {
    serviceOptions: ["Mowing", "Weeding", "Fertilizing"],
    equipments: [{ name: "Lawn Mower", price: 300 }],
    extraFields: []
  },
  402: {
    serviceOptions: ["Garden Design", "Plant Installation"],
    equipments: [],
    extraFields: []
  },
  403: {
    serviceOptions: ["Tree Trimming", "Pruning"],
    equipments: [],
    extraFields: []
  },
  404: {
    serviceOptions: ["Garden Lights", "Pathway Lights"],
    equipments: [],
    extraFields: []
  },

  // Installation
  501: {
    serviceOptions: ["AC Install", "AC Uninstall"],
    equipments: [],
    extraFields: []
  },
  502: {
    serviceOptions: ["Wall Mount", "Stand Mount"],
    equipments: [],
    extraFields: []
  },
  503: {
    serviceOptions: ["Front Load", "Top Load"],
    equipments: [],
    extraFields: []
  },
  504: {
    serviceOptions: ["CCTV", "Doorbell", "Other Smart Device"],
    equipments: [],
    extraFields: []
  },

  // Moving
  601: {
    serviceOptions: ["1BHK", "2BHK", "3BHK+"],
    equipments: [{ name: "Packing Material", price: 500 }],
    extraFields: []
  },
  602: {
    serviceOptions: ["Within State", "Interstate"],
    equipments: [{ name: "Packing Material", price: 1000 }],
    extraFields: []
  },
  603: {
    serviceOptions: ["Bed", "Sofa", "Cupboard"],
    equipments: [],
    extraFields: []
  },
  604: {
    serviceOptions: ["Loading", "Unloading", "Both"],
    equipments: [],
    extraFields: []
  },

  // Household Staffing
  701: {
    serviceOptions: ["Full Time", "Part Time"],
    equipments: [],
    extraFields: []
  },
  702: {
    serviceOptions: ["Full Time", "Part Time"],
    equipments: [],
    extraFields: []
  },
  703: {
    serviceOptions: ["Live-in", "Day Care"],
    equipments: [],
    extraFields: []
  },
  704: {
    serviceOptions: ["Hourly", "Daily"],
    equipments: [],
    extraFields: []
  },

  // Laundry
  801: {
    serviceOptions: ["Wash Only", "Iron Only", "Wash & Iron"],
    equipments: [],
    extraFields: []
  },
  802: {
    serviceOptions: ["Clothes", "Curtains", "Other"],
    equipments: [],
    extraFields: []
  },
  803: {
    serviceOptions: ["Sports Shoes", "Leather Shoes", "Other"],
    equipments: [],
    extraFields: []
  },

  // Security
  901: {
    serviceOptions: ["Install", "Monitor", "Both"],
    equipments: [],
    extraFields: []
  },
  902: {
    serviceOptions: ["Smart Lock", "Alarm System"],
    equipments: [],
    extraFields: []
  },
  903: {
    serviceOptions: ["Audio Only", "Video Intercom"],
    equipments: [],
    extraFields: []
  },

  // Wellness
  110: {
    serviceOptions: ["Hair", "Skin", "Makeup"],
    equipments: [],
    extraFields: []
  },
  111: {
    serviceOptions: ["Yoga", "Gym Training"],
    equipments: [],
    extraFields: []
  },
  112: {
    serviceOptions: ["Rehabilitation", "Pain Relief"],
    equipments: [],
    extraFields: []
  }
};

export default bookingFormConfig;
