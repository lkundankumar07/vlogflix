export default function handler(req, res) {
  res.status(200).json([
    { id: 1, title: "Manali Trip - Himachal", category: "Travel", views: "1.2M" },
    { id: 2, title: "Patna Food Tour", category: "Food", views: "2.1M" },
    { id: 3, title: "Goa Beach Party", category: "Travel", views: "3.4M" }
  ]);
}
