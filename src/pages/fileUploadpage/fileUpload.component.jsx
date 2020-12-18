import {React} from 'react';
import UploadForm from '../../components/uploadForm/uploadForm.component';

import './fileUpload.styles.scss';
const FileUpload =()=>(
    <div className="section-content">
       <UploadForm buttonLabel="SOW"/>
       <UploadForm buttonLabel="PO"/>
       <UploadForm buttonLabel="Billing Tracker"/>
       <UploadForm buttonLabel="Invoice"/>
       <UploadForm buttonLabel="Allocation"/>
    </div>
)

export default FileUpload;