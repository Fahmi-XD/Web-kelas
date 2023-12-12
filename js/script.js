$(document).ready(() => {
    (async () => {
        const navbarBtn = document.querySelector(".sidebar");
        const navbarItems = document.querySelector(".header .navbar .items");
        const liTri = document.querySelectorAll(".header .navbar .items li");
        const sec = document.querySelectorAll("section");

        let partJson = {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: "img/github.svg",
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: false,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true,
            config_demo: {
                hide_card: false,
                background_color: "#b61924",
                background_image: "",
                background_position: "50% 50%",
                background_repeat: "no-repeat",
                background_size: "cover"
            }
        };
        let jsonUri =
            "data:text/plain;base64," + window.btoa(JSON.stringify(partJson));

        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
        particlesJS.load("particles-js", jsonUri, function () {
            console.log("callback - particles.js config loaded");
        });

        navbarBtn.addEventListener("click", () => {
            navbarBtn.classList.toggle("show");
            navbarItems.classList.toggle("show");
            if (navbarBtn.classList[1]) {
                for (let i = 0; i < liTri.length; i++) {
                    liTri[i].addEventListener("click", () => {
                        navbarBtn.classList.remove("show");
                        navbarItems.classList.remove("show");
                    });
                }
                for (sc of sec) {
                    sc.addEventListener("click", () => {
                        navbarBtn.classList.remove("show");
                        navbarItems.classList.remove("show");
                    });
                }
            }
        });

        var typed = new Typed(".description", {
            strings: ["Selalu Ramah 💀", "Rajin piket.", "Paling LMAO 😁"],
            typeSpeed: 80,
            loop: true,
            backSpeed: 50
        });

        const table = document.getElementById("table-data");
        const tableAll = document.getElementById("table-dataAll");

        table.innerHTML = `<tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                </tr>`;

        let ht = "";
        await $.getJSON(
            "https://raw.githubusercontent.com/Fahmi-XD/Web-kelas/main/data.json",
            data => {
                for (js of data.foto) {
                    ht += `<div class="mx-3">
<img src="./image/galery/${js}" alt="" />
</div>`;
                }
            }
        );
        await $(".slider").html(ht);

        await $(".slider").slick({
            centerMode: true,
            dots: false,
            autoplay: true,
            centerPadding: "30px",
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: "40px",
                        Infinity: true,
                        slidesToShow: 1
                    }
                }
            ]
        });

        await $.getJSON(
            "https://raw.githubusercontent.com/Fahmi-XD/Web-kelas/main/data.json",
            y => {
                insertData(y);
            }
        );

        function insertData(y) {
            let z = 0;
            y.siswa.sort((a, b) => (a.nama > b.nama ? 1 : -1));
            for (let keys of y.siswa) {
                z++;
                if (z !== 11) {
                    table.innerHTML += `<tr>
                    <td>${z}</td>
                    <td>${keys.nama}</td>
                </tr>`;
                } else {
                    break;
                }
            }
        }

        function insertDataAll(y) {
            document.getElementById("student").style.display = "flex";
            let z = 0;
            y.siswa.sort((a, b) => (a.nama > b.nama ? 1 : -1));
            for (let keys of y.siswa) {
                z++;
                tableAll.innerHTML += `<tr>
                    <td>${z}</td>
                    <td>${keys.nama}</td>
                </tr>`;
            }
        }

        async function tableOn() {
            tableAll.innerHTML = null;
            tableAll.innerHTML = `<tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                </tr>`;

            await $.getJSON(
                "https://raw.githubusercontent.com/Fahmi-XD/Web-kelas/main/data.json",
                y => {
                    insertDataAll(y);
                }
            );
        }

        function closeStudent() {
            document.getElementById("student").style.display = "none";
        }

        document.getElementById("btnnya").addEventListener("click", () => {
            tableOn();
        });

        document
            .getElementById("btnnya-close")
            .addEventListener("click", () => {
                closeStudent();
            });
    })();
    const heroElement = document.querySelector("section.hero");

    const heroObserve = new IntersectionObserver(
        entries => {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                document.querySelector("header.header").style =
                    "background: var(--bs-blue)";
            } else {
                document.querySelector("header.header").style =
                    "background: transparent";
            }
        },
        { threshold: 0.9 }
    );

    const upObserve = new IntersectionObserver(
        entries => {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                document.querySelector("#up").style = "opacity: 1; display: flex";
            } else {
                document.querySelector("#up").style = "opacity: 0; display: none";
            }
        },
        { threshold: 0.9 }
    );

    upObserve.observe(heroElement);
    heroObserve.observe(heroElement);

    $("#up").click(() => {
        window.scrollTo(window.top);
    });
});
