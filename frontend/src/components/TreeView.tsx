import { Typography, Collapse, Button, Space } from "antd";
import type { Section, Entry } from "../types";
import { computeSums } from "../utils";
import EntryCard from "./EntryCard";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Title } = Typography;

interface TreeViewProps {
  data: Section;
  setData: (data: Section) => void;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  padding: 32,
  background: "#f5f5f5",
};

const contentStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
};

export const TreeView = ({ data, setData }: TreeViewProps) => {
  // Recursively updates the section tree at the given path with the updater function
  const updateTreeAtPath = (
    section: Section,
    path: number[],
    updater: (target: Section) => Section
  ): Section => {
    if (path.length === 0) return updater(section);

    const [index, ...rest] = path;
    const child = section.children[index];

    if (!("children" in child)) throw new Error("Invalid path – not a section");

    const updatedChild = updateTreeAtPath(child, rest, updater);

    const updatedChildren = [...section.children];
    updatedChildren[index] = updatedChild;

    return { ...section, children: updatedChildren };
  };

  // Updates an existing entry at the given path with new values
  const updateEntry = (path: number[], updatedEntry: Entry) => {
    const updated = updateTreeAtPath(data, path.slice(0, -1), (section) => {
      const newChildren = [...section.children];
      newChildren[path[path.length - 1]] = updatedEntry;
      return { ...section, children: newChildren };
    });
    setData(updated);
  };

  // Adds a new entry to the section at the given path. If the path points to a section, it adds an entry there.
  const addEntry = (path: number[]) => {
    const updated = updateTreeAtPath(data, path, (section) => ({
      ...section,
      children: [
        ...section.children,
        {
          name: "New Entry",
          sum: 0,
          note: "New note",
        },
      ],
    }));
    setData(updated);
  };

  // Adds a new section to the section at the given path. If the path points to a section, it adds a new section there.
  const addSection = (path: number[]) => {
    const updated = updateTreeAtPath(data, path, (section) => ({
      ...section,
      children: [
        ...section.children,
        {
          name: "New Section",
          children: [],
        },
      ],
    }));
    setData(updated);
  };

  // Removes an item (either entry or section) at the given path.
  const removeItem = (path: number[]) => {
    const updated = updateTreeAtPath(data, path.slice(0, -1), (section) => {
      const newChildren = [...section.children];
      newChildren.splice(path[path.length - 1], 1);
      return { ...section, children: newChildren };
    });
    setData(updated);
  };

  const renderTree = (section: Section, path: number[] = []) => {
    const computed = computeSums(section);

    return (
      <Collapse
        key={path.join(".")}
        style={{ marginBottom: 16 }}
        defaultActiveKey={["1"]}
      >
        <Panel
          key="1"
          header={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={5} style={{ margin: 0 }}>
                {path.length
                  ? `${path.map((p) => p + 1).join(".")} ${computed.name}`
                  : computed.name}
              </Title>
              <b style={{ marginRight: 20 }}>
                {computed.computedSum.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </b>
            </div>
          }
        >
          <>
            {computed.children.map((child, i) => {
              const childPath = [...path, i];
              if ("children" in child) {
                return (
                  <div
                    key={childPath.join(".")}
                    style={{ position: "relative" }}
                  >
                    {renderTree(child, childPath)}
                    <Button
                      size="small"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeItem(childPath)}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 8,
                        zIndex: 1,
                      }}
                    />
                  </div>
                );
              }
              return (
                <EntryCard
                  key={childPath.join(".")}
                  index={childPath.join(".")}
                  entry={child}
                  onUpdate={(updated) => updateEntry(childPath, updated)}
                  onRemove={() => removeItem(childPath)}
                />
              );
            })}

            <Space style={{ marginTop: 12 }}>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => addEntry(path)}
              >
                Add Entry
              </Button>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => addSection(path)}
              >
                Add Section
              </Button>
            </Space>
          </>
        </Panel>
      </Collapse>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>{renderTree(data)}</div>
    </div>
  );
};
