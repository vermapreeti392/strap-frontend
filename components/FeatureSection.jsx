"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const API_URL = "http://localhost:1337/api/feature";
const FeatureSection = () => {
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://strapi-project-hn4y.onrender.com/api/porducts/?populate=*"
        );
        const data = await response.json();
        if (data && data.data) {
          const fetchedFeatures = data.data.map((item) => ({
            id: item.id,
            title: item.Title,
            description: item.Description,
            image: `${item.Image[0]?.url}`,
          }));

          setFeatures(fetchedFeatures);
          setSelectedFeature(fetchedFeatures[1]);
        } else {
          console.error("No features found in the response");
        }

        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching features:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchFeatures();
  }, []);
  console.log(selectedFeature);
  if (loading) {
    return <p>Loading features...</p>;
  }
  return (
    <section className="feature-section">
      <div className="container">
        <p className="choose-text">WHY CHOOSE US</p>
        <h2>We Are Different From Others</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <div className="feature-content">
          <div className="feature-image">
            <div className="feature-details">
              <h3>{selectedFeature.title}</h3>
              <p>{selectedFeature.description}</p>
            </div>
            <div className="image-div">
              <img
                src={selectedFeature.image}
                alt={selectedFeature.title}
                width={320}
                height={320}
                className="image"
              />
            </div>
          </div>
          <div className="feature-list">
            {features.map((feature) => (
              <>
                <button
                  key={feature.id}
                  className={`feature-item ${
                    selectedFeature.id === feature.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedFeature(feature)}
                >
                  <span className="feature-icon">{"<"}</span>
                  {feature.title}
                </button>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
