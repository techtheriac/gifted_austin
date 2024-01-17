export default function Musing({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>;
}
