import { useSortable } from "@dnd-kit/sortable";
import { IEvaluatable } from "~/types/Evaluatable";
import Rule from "./Rule";

type SortableRuleProps = {
  rule: IEvaluatable;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SortableRule(props: SortableRuleProps) {
  const { rule, onEdit, onDelete } = props;
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: rule.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const className = isDragging ? "border-violet-200" : "";

  return (
    <Rule
      key={rule.id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={className}
      rule={rule}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
