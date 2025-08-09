import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Detailed descriptions for each product by id
const productDescriptions = {
  101: `House deep cleaning involves a comprehensive cleaning process covering all rooms, floors, windows, and surfaces using professional-grade cleaning agents. The base cost of ₹6000 typically covers an average 3BHK home; larger or more cluttered homes may incur additional charges based on size and complexity.`,
  
  102: `Sofa and carpet cleaning utilizes steam cleaning and special detergents to remove dust, stains, and allergens. The cost of ₹500 is generally for a single sofa or carpet area; additional pieces are priced separately depending on size and fabric.`,
  
  103: `Bathroom cleaning covers scrubbing and disinfecting toilets, sinks, showers, and floors with specialized cleaners to ensure hygiene. ₹699 covers one standard bathroom; extra bathrooms or deep stain removal may increase the price.`,
  
  104: `Kitchen cleaning includes degreasing stovetops, cleaning countertops, cabinets, and sinks using non-toxic cleaning solutions. ₹1000 covers a typical kitchen size; larger kitchens may be priced differently.`,
  
  105: `Water tank cleaning involves emptying, scrubbing, disinfecting overhead and underground water tanks to prevent contamination. ₹1500 is the base price for tanks up to 1000 liters; larger tanks may have additional charges.`,
  
  106: `Pest control services target common household pests such as cockroaches, termites, and rodents. ₹1500 includes initial treatment; follow-up visits and infestations requiring more chemicals are charged extra.`,
  
  108: `Furniture cleaning involves polishing, stain removal, and dusting for wood, leather, or upholstered furniture. ₹999 covers standard-sized items; special materials or heavy stains may increase the price.`,
  
  201: `AC and HVAC repair services include diagnosis, minor repairs, and routine maintenance to keep systems running efficiently. ₹1500 covers labor and basic parts; major component replacements are charged separately.`,
  
  202: `Plumbing services cover fixing leaks, unclogging drains, installing taps, and pipe repairs. ₹1200 is a standard rate for simple repairs; complex jobs may cost more.`,
  
  203: `Electrical repairs include fixing wiring faults, replacing switches, and repairing appliances. ₹1300 covers basic repairs; rewiring or new installations are priced higher.`,
  
  204: `Appliance repairs encompass servicing refrigerators, washing machines, microwaves, and other household devices. ₹1400 covers diagnostics and minor fixes; replacement parts incur extra costs.`,
  
  205: `Carpentry work includes furniture repair, custom woodwork, and installation. ₹1600 covers small to medium-sized projects; larger or complex tasks have higher rates.`,
  
  206: `RO/Water purifier servicing involves filter replacement, cleaning, and maintenance to ensure water quality. ₹1000 covers standard models; advanced purifiers may cost more.`,
  
  207: `Inverter/UPS services provide battery checks, replacements, and minor repairs. ₹1700 includes labor; new batteries or major parts cost extra.`,
  
  301: `Painting services cover interior and exterior walls using quality paints. ₹2000 is the base cost for average rooms; price varies with surface area and paint type.`,
  
  302: `Flooring and tiling services include installation and repair of tiles, vinyl, or wooden floors. ₹3000 covers medium-sized areas; material cost varies.`,
  
  303: `False ceiling installation involves design and fitting of suspended ceilings for aesthetics and insulation. ₹3500 is a base price for standard rooms.`,
  
  304: `Wall repair or waterproofing protects structures against cracks and moisture damage. ₹2500 covers treatment for typical rooms; extensive damage costs more.`,
  
  305: `Modular kitchen setup includes customized design, fabrication, and installation. ₹15000 is the starting price depending on size and materials.`,
  
  401: `Lawn maintenance includes mowing, trimming, and fertilizing to keep gardens healthy. ₹1200 covers small lawns; large gardens priced accordingly.`,
  
  402: `Landscaping services involve garden design, planting, and hardscaping elements. ₹8000 covers medium-scale projects.`,
  
  403: `Tree trimming and pruning maintain tree health and appearance. ₹2000 is typical for small to medium trees.`,
  
  404: `Outdoor lighting installation adds pathway, garden, and security lighting. ₹3000 covers basic setups.`,
  
  501: `AC installation/uninstallation services include mounting, wiring, and testing. ₹1200 per unit.`,
  
  502: `TV mounting services provide secure wall mounts for various TV sizes. ₹800 is a standard rate.`,
  
  503: `Washing machine setup covers plumbing and electrical connections. ₹1000 per unit.`,
  
  504: `Smart home device installation includes CCTV cameras, doorbells, and automation gadgets. ₹2500 base price.`,
  
  601: `Local shifting involves packing, transporting, and unpacking goods within the city. ₹5000 base price depending on volume.`,
  
  602: `Intercity relocation includes long-distance moving services with packing and transport. ₹15000 starting price.`,
  
  603: `Furniture disassembly and reassembly assist in moving bulky items safely. ₹2500 per job.`,
  
  604: `Loading and unloading services help move goods during relocations. ₹2000 is a standard rate.`,
  
  701: `Cook and chef services provide daily meal preparation customized to dietary needs. ₹15000 per month.`,
  
  702: `Housemaids offer household cleaning, cooking, and assistance. ₹8000 monthly rate.`,
  
  703: `Elderly care providers assist with daily activities and companionship. ₹12000 monthly charge.`,
  
  704: `Drivers on demand provide personal or professional driving services. ₹20000 per month.`,
  
  801: `Clothing washing and ironing service for daily wear and delicate items. ₹150 per load.`,
  
  802: `Dry cleaning service for suits, curtains, and special fabrics. ₹300 per item.`,
  
  803: `Shoe cleaning and polishing for leather and sports shoes. ₹250 per pair.`,
  
  901: `CCTV installation and monitoring enhance home security with cameras and recording devices. ₹4000 base price.`,
  
  902: `Smart locks and alarm systems installation for enhanced safety. ₹3500 per system.`,
  
  903: `Intercom systems setup enables audio and video communication within buildings. ₹3000 per unit.`,
  
  110: `At-home salon services offer haircuts, styling, and beauty treatments at your convenience. ₹1200 base price.`,
  
  111: `Fitness and yoga trainers provide personalized workout and wellness plans. ₹1500 per session.`,
  
  112: `Physiotherapy services focus on pain relief and rehabilitation using therapeutic exercises. ₹2000 per session.`
};

const ProductCard = ({ product, isAuthenticated, requestLogin }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/book/${product.id}`);
    } else {
      requestLogin(`/book/${product.id}`);
    }
  };

  const handleMoreInfo = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const handleClose = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <>
      <div className="product-card">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        )}
        <h3>{product.name || product.category}</h3>
        {product.price && <p className="product-price">{product.price}</p>}
        <div className="button-container">
          <button className="btn-book" onClick={handleBookNow}>
            Book Now
          </button>
          <button className="btn-info" onClick={handleMoreInfo}>
            More Info
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{product.name}</h3>
            {product.price && <p><strong>Price:</strong> {product.price}</p>}
            <p><strong>Description:</strong> {productDescriptions[product.id] || "No description available."}</p>
            <button className="btn-close" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
