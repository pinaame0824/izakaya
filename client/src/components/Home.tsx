import { Link } from 'react-router-dom';
import skewersImg from '../assets/skewers.png';
import sashimiImg from '../assets/sashimi.png';
import sakeImg from '../assets/sake.png';
import heroImg from '../assets/hero.png';

const Home = () => {
    return (
        <main>
            <section id="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="fade-in active">心に火を灯し、<br />旬を味わう。</h1>
                    <p className="fade-in delay-1 active">炭火の香りと厳選された日本酒。大人の隠れ家「篝火」へようこそ。</p>

                </div>
            </section>

            <section id="concept" className="section">
                <div className="container">
                    <div className="concept-layout">
                        <div className="concept-text active">
                            <span className="sub-title">CONCEPT</span>
                            <h2>五感を満たす、<br />ひとときの贅。</h2>
                            <p>厳選された旬の食材を、熟練の職人が炭火で丁寧に焼き上げます。炭火特有の遠赤外線効果で、外はパリッと、中はジューシーに。素材の旨味を最大限に引き出した逸品の数々をご堪能ください。</p>
                            <p>また、全国の酒蔵から店主自ら買い付けた、料理を引き立てる銘酒も多数取り揃えております。お一人様でも、大切な方との語らいでも。都会の喧騒を離れ、暖かな火に包まれるような時間をご提供いたします。</p>
                        </div>
                        <div className="concept-image active">
                            <img src={skewersImg} alt="自慢の炭火焼き" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" className="section bg-dark">
                <div className="container">
                    <div className="section-header text-center active">
                        <span className="sub-title text-gold">MENU</span>
                        <h2 className="text-white">お品書き</h2>
                    </div>
                    <div className="menu-grid">
                        <div className="menu-item active">
                            <div className="menu-img-wrapper">
                                <img src={skewersImg} alt="串焼き盛り合わせ" />
                            </div>
                            <div className="menu-info">
                                <h3>極上 炭火串焼き</h3>
                                <p>大山どりを使用した自慢の串。秘伝のタレとこだわりの塩で。</p>
                                <span className="price">¥1,800〜</span>
                            </div>
                        </div>
                        <div className="menu-item active delay-1">
                            <div className="menu-img-wrapper">
                                <img src={sashimiImg} alt="鮮魚の刺身盛り合わせ" />
                            </div>
                            <div className="menu-info">
                                <h3>豊洲直送 鮮魚五種盛り</h3>
                                <p>毎朝市場から届く最も脂の乗った魚を厳選。確かな鮮度を。</p>
                                <span className="price">¥2,400〜</span>
                            </div>
                        </div>
                        <div className="menu-item active delay-2">
                            <div className="menu-img-wrapper">
                                <img src={sakeImg} alt="厳選日本酒" />
                            </div>
                            <div className="menu-info">
                                <h3>店主厳選 季節の銘酒</h3>
                                <p>十四代、新政など。料理に寄り添う希少な酒を取り揃え。</p>
                                <span className="price">グラス ¥800〜</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-60 active">
                        <Link to="/menu" className="btn btn-outline">すべてのお品書きを見る</Link>
                    </div>
                </div>
            </section>

            <section id="gallery" className="section">
                <div className="gallery-full active">
                    <div className="gallery-text">
                        <span className="sub-title">ATMOSPHERE</span>
                        <h2>落ち着きのある和のモダン空間</h2>
                        <p>カウンター席では職人の手捌きを間近で楽しみ、個室ではプライベートなひとときを。あらゆるシーンに寄り添う空間をご用意しております。</p>
                    </div>
                    <div className="gallery-main-img">
                        <img src={heroImg} alt="店内の様子" />
                    </div>
                </div>
            </section>

            <section id="access" className="section bg-paper">
                <div className="container access-layout">
                    <div className="info-details active">
                        <span className="sub-title">INFO</span>
                        <h2>店舗情報</h2>
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <th>店名</th>
                                    <td>居酒屋 篝火 (KAGARIBI)</td>
                                </tr>
                                <tr>
                                    <th>住所</th>
                                    <td>〒150-0001 東京都渋谷区神宮前 1-2-3<br />篝火ビル 1F</td>
                                </tr>
                                <tr>
                                    <th>電話番号</th>
                                    <td>03-1234-5678</td>
                                </tr>
                                <tr>
                                    <th>営業時間</th>
                                    <td>17:00 - 28:00</td>
                                </tr>
                                <tr>
                                    <th>定休日</th>
                                    <td>年中無休</td>
                                </tr>
                                <tr>
                                    <th>席数</th>
                                    <td>28席（カウンター10席、テーブル12席、個室6席）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="map-wrapper active">
                        <div className="map-placeholder">
                            <span>MAP</span>
                            <p>渋谷駅より徒歩5分</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="reservation" className="section reservation-section">
                <div className="container text-center active">
                    <span className="sub-title text-gold">RESERVATION</span>
                    <h2 className="text-white">ご予約・お問い合わせ</h2>
                    <p className="text-white opacity-8">お電話または24時間受付のネット予約より承っております。</p>
                    <div className="res-actions">
                        <a href="tel:0312345678" className="btn btn-primary">電話で予約する</a>
                        <Link to="/reservation" className="btn btn-gold">ネット予約 (24h)</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
