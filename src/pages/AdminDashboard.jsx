import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import ChatBox from "../components/ChatBox";
import { motion } from "framer-motion";

const API = "https://medistore-backend.onrender.com"

// const API = "http://localhost:5000"


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chatloading, setChatLoading] = useState(true);
  const categories = [
  "Analgesics",
  "Anti Allergy",
  "Anti-Cancer",
  "Anti-Diabetic Drugs",
  "Anti-Fungal",
  "Anti-Malaria",
  "Anti-Ulcer",
  "Antiandrogens",
  "Antibiotics",
  "Anticonvulsants",
  "Antidepressants",
  "Diuretics",
  "Antioxidant",
  "Antipsychotics",
  "Antiretrovirals",
  "Antiseptic Liquid",
  "Antispasmodics",
  "Antithyroidism",
  "Appetite Stimulants",
  "Beauty and Cosmetics",
  "Body Builder",
  "Cardiovascular Health Drugs",
  "Contraceptives",
  "Control",
  "Cough and Cold Drugs",
  "Emergency Poisoning Treatment",
  "Eye Supplements & Drugs",
  "Eye, Ear & Nose Drops & Ointments",
  "Featured",
  "Feminine Hygiene & Suppositories",
  "General",
  "Hematinic",
  "Immunosuppressants",
  "Infusion",
  "Inhibitors",
  "Injection I.M/I.V",
  "Iron Supplements",
  "Joints and Bone Support Drugs",
  "Laxatives",
  "Lipid Lowering Drugs",
  "Liver Supplements",
  "Lozenges",
  "Lubricant",
  "Medical & Hospital Equipment",
  "Oncology Drugs",
  "Oral and Dental Care",
  "Oral Rehydration",
  "Probiotic",
  "Respiratory Health",
  "Sedatives",
  "Sexual Wellness / Fertility Drugs",
  "Sleep Aid",
  "Topical Preparations",
  "Vaccines",
  "Weight Loss Supplements",
  "Wellbeing / Dietary Supplements",
  "Worm Expeller",
  "Wound Dressing",
];




  // Fetch all users (patients)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API}/api/users`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setChatLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const token = localStorage.getItem("token");
  
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token ",token);
        
        const res = await axios.get(`${API}/api/prescriptions/all`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        console.log(res);
        
        if (Array.isArray(res.data)) {
          setPrescriptions(res.data);
        } else {
          setPrescriptions([]);
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setPrescriptions([]);
      }
    };
    if (activeTab === "prescriptions") {
      fetchPrescriptions();
    }
  }, [activeTab]);
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("Token ", token);
  
  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token"); // :white_check_mark: always fetch fresh token
    if (!token) {
      console.warn("No token found, please log in again");
      return;
    }
    const res = await axios.get(`${API}/api/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(res.data);
  } catch (err) {
    console.error("Failed to fetch orders:", err.response?.data || err.message);
  }
};

  const handleAddProduct = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image); // important: file itself

    if(!token){
        alert("You must be logged in as admint to add products")
        setLoading(false);
        return;
    }
    
    await axios.post(`${API}/api/products/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    toast.success("Product added successfully!");
    setNewProduct({ name: "", price: "", category: "", image: "" });
    fetchProducts();
  } catch (err) {
    console.error(err);
    toast.error("Error adding product");
  } finally {
    setLoading(false);
  }
};

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/api/orders/${id}`, 
        
        {deliveryStatus: status}, 
        
        {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/admins`, newAdmin);
      alert("New admin created successfully!");
      setNewAdmin({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating admin");
    }
  };


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Only admin can delete products");
      return;
    }
    await axios.delete(`${API}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("✅ Product deleted successfully");
    // Optionally refresh product list
    fetchProducts(); // <-- Call your function that reloads products
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error.response?.status === 403) {
      toast.error("Access denied: Admins only");
    } else {
      toast.error("Failed to delete product. Please try again.");
    }
  }
}

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 h-16 flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-primary">ProseMediStore Admin</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["overview", "products", "orders", "admins", "prescriptions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg font-medium ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-sm text-gray-500">Total Products</h2>
              <p className="text-3xl font-bold text-primary">{products.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-sm text-gray-500">Total Orders</h2>
              <p className="text-3xl font-bold text-primary">{orders.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-sm text-gray-500">Delivered Orders</h2>
              <p className="text-3xl font-bold text-primary">
                {orders.filter((o) => o.deliveryStatus === "Delivered").length}
              </p>
            </div>
          </div>
        )}

        {/* Add Products */}
        {activeTab === "products" && (
          <div className="space-y-10">
            <form onSubmit={handleAddProduct} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
                Add New Product
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
                />
                <select
                    value={newProduct.category}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                    >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                </select>
                <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
                />
                {/* ✅ Image Upload (real file input) */}
                <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
                className="border rounded-lg px-3 py-2"
                />
            </div>
            <button
            type="submit"
            className={`mt-5 px-6 py-2 rounded-lg font-medium text-white transition-all ${
                loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
            disabled={loading}
            >
            {loading ? "Adding..." : "Add Product"}
            </button>
            </form>
            <div>
              <h2 className="text-lg font-semibold text-primary mb-4">
                Product List
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white shadow rounded-xl overflow-hidden"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.category}</p>
                      <p className="text-primary font-medium mt-2">
                        ₦{p.price.toLocaleString()}
                      </p>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="mt-4 bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition-all w-full"
                    >
                        Delete
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prescriptions */}
        {activeTab === "prescriptions" && (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Uploaded Prescriptions
            </h2>
            {prescriptions.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
                No prescriptions uploaded yet.
            </p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {prescriptions.map((prescription) => (
                <div
                    key={prescription._id}
                    className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                    <img
                    src={prescription.imageUrl}
                    alt="Prescription"
                    className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                        {prescription.user?.name || "Unknown User"}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {prescription.userEmail}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Uploaded on{" "}
                        {new Date(prescription.createdAt).toLocaleDateString()}
                    </p>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        )}
        {/* Orders */}
        {activeTab === "orders" && (
          <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Manage Orders
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{order.orderRef}</td>
                    <td className="p-3">{order.email}</td>
                    <td className="p-3">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.deliveryStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.deliveryStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.deliveryStatus === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) =>
                          handleUpdateStatus(order._id, e.target.value)
                        }
                        className="border rounded-lg px-2 py-1 text-sm"
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Admins */}
        {activeTab === "admins" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Add New Admin
            </h2>
            <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Admin Email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 sm:col-span-2"
              >
                Create Admin
              </button>
            </form>
          </div>
        )}
        
      </div>


      {/* <ChatBox
          label="Talk to a patient"
          isAdmin={true}
          conversationIdProp="68ff7334a8c2c6cdd25574d0" // ✅ this fixes the undefined issue
        /> */}

        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6">
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Admin Chat Dashboard 💬
          </h2>
          <p className="text-gray-500 text-sm">
            Select a patient below to start a conversation with them in real time.
          </p>
        </div>
        {chatloading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0046A5]" />
            <span className="ml-3 text-gray-600">Loading users...</span>
          </div>
        ) : (
          <div className="mb-6">
            <label
              htmlFor="userSelect"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a user to chat with
            </label>
            <div className="relative">
              <select
                id="userSelect"
                onChange={(e) => setSelectedUserId(e.target.value)}
                value={selectedUserId || ""}
                className="block w-full appearance-none border border-gray-300 rounded-xl px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0046A5] focus:border-[#0046A5] transition"
              >
                <option value="">-- Choose a user --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        )}
        {selectedUserId ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatBox
              label="Talk to a patient"
              isAdmin={true}
              conversationIdProp={selectedUserId}
            />
          </motion.div>
        ) : (
          <div className="text-center py-10 text-gray-500 border-t border-gray-100">
            <p className="text-sm">Select a user to start chatting 👇</p>
          </div>
        )}
      </motion.div>
    </div>




    </div>
    
  );
}