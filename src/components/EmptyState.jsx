import { AnimatedEmptyState } from './reactbits/AnimatedEmptyState';

export function EmptyState({ title, text, action }) {
  return <AnimatedEmptyState title={title} text={text} action={action} />;
}
