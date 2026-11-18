import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, ArrowLeft, Glasses, Info, Package, ScanLine, Warehouse } from 'lucide-react';

const MODEL = '/assets/vr/warehouse/nusantara_mart_warehouse.glb';

export default function WarehouseVR({ onClose }) {
  const [activeInfo, setActiveInfo] = useState('overview');
  const [scanned, setScanned] = useState(false);

  const modelRef = useRef(null);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.setAttribute(
        'gltf-model',
        `url(${MODEL})`
      );

      modelRef.current.setAttribute('position', '0 0 0');
      modelRef.current.setAttribute('rotation', '0 0 0');
      modelRef.current.setAttribute('scale', '1 1 1');
    }
  }, []);

  const inspect = (id) => { setActiveInfo(id); if (id === 'scanner') setScanned(true); };
  const info = {
    overview: { title: 'Area Gudang Nusantara Mart', body: 'Jelajahi rak penyimpanan dan area pemeriksaan barang. Perhatikan perbedaan antara data persediaan dan kondisi fisik.', tag: 'ORIENTASI' },
    rack: { title: 'Rak persediaan', body: 'Rak menyimpan produk yang siap dijual. Petugas perlu memastikan setiap perpindahan barang dicatat ke sistem.', tag: 'PENYIMPANAN' },
    pallet: { title: 'Area barang masuk', body: 'Barang yang diterima dari pemasok perlu dihitung dan dicocokkan dengan dokumen penerimaan sebelum ditambahkan ke stok.', tag: 'BARANG MASUK' },
    scanner: { title: 'Pemeriksaan barcode', body: 'Pemindaian barcode membantu menghubungkan barang fisik dengan catatan inventaris. Simulasi ini menandai pemeriksaan sebagai selesai.', tag: 'PEMERIKSAAN' },
    terminal: { title: 'Terminal inventaris', body: 'Terminal digunakan petugas untuk melihat catatan stok. Pada kasus ini sistem mencatat 50 unit, sedangkan stok fisik yang ditemukan hanya 35 unit.', tag: 'DATA SISTEM' }
  }[activeInfo];
  return <div className="warehouse-vr">
    <div className="warehouse-vr-toolbar">
      <button className="warehouse-back" onClick={onClose}><ArrowLeft size={16} /> Kembali ke Explore Company</button>
      <div className="warehouse-vr-title"><Warehouse size={17} /> Nusantara Mart <span>· Warehouse VR</span></div>
      <div className="warehouse-vr-mode"><Glasses size={15} /> 3D INTERACTIVE</div>
    </div>
    <div className="warehouse-vr-stage">
      <a-scene embedded vr-mode-ui="enabled: true" renderer="colorManagement: true; antialias: true" background="color: #dfe9f7" loading-screen="enabled: false" style={{ width: '100%', height: '100%' }}>
        <a-entity ref={modelRef}></a-entity>
        <a-entity class="clickable" position="-4.7 2.65 0.1" geometry="primitive: sphere; radius: 0.16" material="color: #f59d4b; emissive: #f59d4b; emissiveIntensity: 0.35" animation="property: scale; to: 1.18 1.18 1.18; dir: alternate; dur: 900; loop: true" onClick={() => inspect('rack')}><a-text value="RAK" align="center" color="#1f345b" position="0 0.28 0" width="2.5"></a-text></a-entity>
        <a-entity class="clickable" position="1.4 1.7 1.4" geometry="primitive: sphere; radius: 0.16" material="color: #f59d4b; emissive: #f59d4b; emissiveIntensity: 0.35" animation="property: scale; to: 1.18 1.18 1.18; dir: alternate; dur: 1000; loop: true" onClick={() => inspect('pallet')}><a-text value="BARANG MASUK" align="center" color="#1f345b" position="0 0.28 0" width="3.4"></a-text></a-entity>
        <a-entity class="clickable" position="0.85 1.65 3.55" geometry="primitive: sphere; radius: 0.16" material="color: #4f83e5; emissive: #4f83e5; emissiveIntensity: 0.35" animation="property: scale; to: 1.18 1.18 1.18; dir: alternate; dur: 850; loop: true" onClick={() => inspect('scanner')}><a-text value="SCAN" align="center" color="#1f345b" position="0 0.28 0" width="2.5"></a-text></a-entity>
        <a-entity class="clickable" position="0 2.0 3.85" geometry="primitive: sphere; radius: 0.16" material="color: #4f83e5; emissive: #4f83e5; emissiveIntensity: 0.35" animation="property: scale; to: 1.18 1.18 1.18; dir: alternate; dur: 950; loop: true" onClick={() => inspect('terminal')}><a-text value="DATA STOK" align="center" color="#1f345b" position="0 0.28 0" width="3"></a-text></a-entity>

        <a-entity position="0 1.65 5.8">
          <a-camera
            wasd-controls="enabled: true; acceleration: 20; fly: false"
            look-controls="enabled: true; pointerLockEnabled: false"
            raycaster="objects: .clickable"
            cursor="rayOrigin: mouse"
          >
            <a-cursor
              fuse="false"
              material="color: #315fb9; shader: flat"
              geometry="primitive: ring; radiusInner: 0.008; radiusOuter: 0.013"
            ></a-cursor>
          </a-camera>
        </a-entity>

        <a-sky color="#dfe9f7"></a-sky><a-light type="ambient" intensity="1.15"></a-light><a-light type="directional" intensity="1.35" position="-3 8 5"></a-light>
      </a-scene>
      <div className="warehouse-hud"><div className="warehouse-hud-label"><Info size={14} /> {info.tag}</div><strong>{info.title}</strong><p>{info.body}</p>{activeInfo === 'overview' && <span className="warehouse-hint">Gunakan W A S D untuk bergerak · Mouse untuk melihat sekitar · Klik marker untuk memeriksa area</span>}{activeInfo === 'scanner' && <span className="warehouse-complete"><ScanLine size={14} /> {scanned ? 'Pemeriksaan barcode disimulasikan selesai' : 'Periksa barcode'}</span>}</div>
      <div className="warehouse-stock-card"><div><span>STOK SISTEM</span><strong>50 <small>unit</small></strong></div><div className="stock-divider"></div><div><span>STOK FISIK</span><strong>35 <small>unit</small></strong></div><div className="stock-gap"><AlertTriangle size={14} /> Selisih 15 unit</div></div>
      <div className="warehouse-controls"><button onClick={() => inspect('rack')}><Package size={15} /> Rak</button><button onClick={() => inspect('pallet')}><Warehouse size={15} /> Barang masuk</button><button onClick={() => inspect('scanner')}><ScanLine size={15} /> Scan</button><button onClick={() => inspect('terminal')}><Info size={15} /> Data stok</button></div>
    </div>
    <div className="warehouse-vr-foot"><span>Simulasi gudang · Nusantara Mart</span><span>{scanned ? '1 aktivitas pemeriksaan selesai' : 'Pilih marker untuk mulai eksplorasi'}</span></div>
  </div>;
}
