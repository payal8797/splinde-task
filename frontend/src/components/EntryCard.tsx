import { Card, Input, Typography, Collapse, Button } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { Entry } from "../types";

const { Text } = Typography;
const { Panel } = Collapse;

interface EntryProps {
  entry: Entry;
  index: string;
  onUpdate: (updatedEntry: Entry) => void;
  onRemove?: () => void;
}

const EntryCard = ({ entry, index, onUpdate, onRemove }: EntryProps) => {
  const [sum, setSum] = useState(entry.sum);
  const [note, setNote] = useState(entry.note);

  const handleBlur = () => {
    onUpdate({ ...entry, sum, note });
  };

  return (
    <Card
      style={{ margin: "16px 0", borderRadius: 12 }}
      bodyStyle={{ padding: 16 }}
      title={
        <Text strong>
          {index
            .split(".")
            .map((p) => Number(p) + 1)
            .join(".")}
        </Text>
      }
    >
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary">Name</Text>
        <Input defaultValue={entry.name} disabled style={{ marginTop: 4 }} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <Text type="secondary">Sum</Text>
        <Input
          type="number"
          value={sum}
          onChange={(e) => setSum(Number(e.target.value))}
          onBlur={handleBlur}
          addonAfter="€"
          style={{ marginTop: 4 }}
        />
      </div>

      <Collapse ghost>
        <Panel header="Note" key="note">
          <Input.TextArea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleBlur}
          />
        </Panel>
      </Collapse>

      {onRemove && (
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <Button danger icon={<MinusOutlined />} onClick={onRemove}>
            Remove
          </Button>
        </div>
      )}
    </Card>
  );
};

export default EntryCard;
