import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import swal from "sweetalert2";

import DataUmkm from "./DataUmkm";
import { Umkm } from "../../Assets/Image/index";
import "./UMKMList.css";

const UMKMList = ({ user }) => {
  const navigate = useNavigate();
  const handleDaftarUmkmClick = () => {
    if (user && user.role === "") {
      swal.fire({
        title: "Harap Login Dulu",
        text: "Anda harus login terlebih dahulu untuk mendaftar UMKM.",
        icon: "warning",
      });
    } else {
      navigate("/input-umkm");
      scroll.scrollToTop({
        duration: 100, // Durasi animasi dalam milidetik
        smooth: "easeInOutQuart", // Efek easing (percepatan/perlambatan)
      });
    }
  };

  return (
    <div className="umkm-list-container">
      <div className="umkm-header">
        <h1>Usaha Desa Manud Jaya</h1>
        {user && (user.role === "" || user.role === "user") && (
          <button
            onClick={handleDaftarUmkmClick}
            className="umkm-registration-link"
          >
            Daftar UMKM
          </button>
        )}
        {user && user.role === "kepalaDesa" && (
          <button
            onClick={() => {
              navigate("/umkm-approval");
              scroll.scrollToTop({
                duration: 100, // Durasi animasi dalam milidetik
                smooth: "easeInOutQuart", // Efek easing (percepatan/perlambatan)
              });
            }}
            className="umkm-registration-link"
          >
            Approval UMKM
          </button>
        )}
      </div>
      <div className="umkm-cards">
        {DataUmkm.map((umkm) => (
          <div className="umkm-card" key={umkm.id}>
            <Link
              onClick={() => {
                scroll.scrollToTop({
                  duration: 100, // Durasi animasi dalam milidetik
                  smooth: "easeInOutQuart", // Efek easing (percepatan/perlambatan)
                });
              }}
              to={`/umkm/${umkm.id}`}
              className="umkm-link"
            >
              <img src={Umkm} alt={umkm.nama} className="umkm-image" />
              <h3>{umkm.nama}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(UMKMList);
