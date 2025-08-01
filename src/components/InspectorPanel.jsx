import './InspectorPanel.css';

const InspectorPanel = ({ data }) => {
  if (!data) {
    return (
      <div className="inspector-panel inspector-panel-hidden">
        <p>Hover over an element to see its styles.</p>
      </div>
    );
  }

  return (
    <div className="inspector-panel">
      <h4>{data.tag}{data.id}{data.classes}</h4>
      <div className="style-grid">
      <div className="style-item">
          <span className="style-label">Name</span>
          <span className="style-value">{data.id }</span>
        </div>

        <div className="style-item">
          <span className="style-label">Color</span>
          <span className="style-value">{data.color}</span>
        </div>
        <div className="style-item">
          <span className="style-label">Background</span>
          <span className="style-value">{data.backgroundColor}</span>
        </div>
        <div className="style-item">
          <span className="style-label">Font Size</span>
          <span className="style-value">{data.fontSize}</span>
        </div>
        <div className="style-item">
          <span className="style-label">Margin</span>
          <span className="style-value">{data.margin}</span>
        </div>
        <div className="style-item">
          <span className="style-label">Padding</span>
          <span className="style-value">{data.padding}</span>
        </div>
      </div>
    </div>
  );
};

export default InspectorPanel; 