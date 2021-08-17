import React, {useState} from 'react';
import {Product} from "./models/Product";
import {NavLink, useHistory} from 'react-router-dom';
import * as productActions from '../../redux/products/product.actions';
import * as productReducer from '../../redux/products/product.reducer';
import * as alertActions from "../../redux/Alert/alert.action";
import {useDispatch , useSelector} from "react-redux";

interface IproductState{
    productKey:productReducer.ProductState
 }

interface IProps{}
interface IState{
    product : Product
}

let ProductUpload:React.FC<IProps> = ({}) => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [state , setState] = useState<IState>({
        product : {
            name : '',
            brand : '',
            size: '',
            image : '',
            price : 0,
            qty : 0,
            category : '',
            description : '',
            usage : ''
        }
    });

    let productStore:productReducer.ProductState = useSelector((store:IproductState)=> {
        return store.productKey
    });

    let {products} = productStore;

    let [stateError, setErrorState] = useState({
        //nameError : '',
        qtyError : '',
        priceError : ''
    })

    // product already exists error can't be solved because productKey holds one category's data at a time.
    // let validateName = (event: React.ChangeEvent<HTMLInputElement>) =>{
    //     setState({
    //         product : {
    //             ...state.product,
    //             [event.target.name] : event.target.value
    //         }
    //     });

    //     for (let product of products){
    //         if (event.target.value === product.name) {
    //             return setErrorState({...stateError, nameError: 'Product already exists'})
    //              }   
    //         else{
    //             setErrorState({...stateError, nameError: ''})
    //         }
    //     }
    // }

    let validateQty = (event: React.ChangeEvent<HTMLInputElement>)  =>{
        setState({
            product : {
                ...state.product,
                [event.target.name] : event.target.value
            }
        });
        Number(event.target.value) < 1 ? setErrorState({...stateError, qtyError: 'Minimum value should be 1'}) : 
        setErrorState({...stateError, qtyError: ''})
    }

    let validatePrice = (event: React.ChangeEvent<HTMLInputElement>)  =>{
        setState({
            product : {
                ...state.product,
                [event.target.name] : event.target.value
            }
        });
        Number(event.target.value) < 1 ? setErrorState({...stateError, priceError: 'Minimum value should be 1'}) : 
        setErrorState({...stateError, priceError: ''})
    }


    let updateInput = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setState({
            product : {
                ...state.product,
                [event.target.name] : event.target.value
            }
        });
    };

    let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile:Blob = event.target.files[0];
        let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
        setState({
            ...state,
            product : {
                ...state.product,
                image : base64Image.toString()
            }
        });
    };

    let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if(fileReader.result){
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let submitUploadProduct = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        stateError.priceError.length  | stateError.qtyError.length ?  dispatch(alertActions.showAlert('bg-danger', 'Enter all fields correctly', 'fa-exclaimation-circle')) //error alert
        : dispatch(productActions.uploadProduct(state.product, history));
    };

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Upload Products Here</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className='card'>
	                            <div className="card-header bg-dark text-white text-center">
                                        <p className='h5 mt-2'>Upload a product</p>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitUploadProduct}>
                                        <div className="mb-2">
                                            <input
                                                required
                                                name={'name'}
                                                value={state.product.name}
                                                //onChange={validateName}
                                                onChange = {updateInput}
                                                type="text" className={'form-control'} placeholder="Name"/>
                                                {/* <small>{stateError.nameError}</small> */}
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                name={'brand'}
                                                value={state.product.brand}
                                                onChange={updateInput}
                                                type="text" className="form-control" placeholder="Brand"/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                name={'size'}
                                                value={state.product.size}
                                                onChange={updateInput}
                                                type="text" className="form-control" placeholder="Size"/>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                name={'image'}
                                                onChange={updateImage}
                                                className="form-control" type="file" id="formFile"/>
                                            <div>
                                                {
                                                    state.product && state.product.image && state.product.image?.length > 0 ?
                                                        <img src={state.product.image} alt={''} width={'40'} height={'50'}/> : null
                                                }
                                                <small className='fa fa-info-circle mx-1'>File size should not be more than 70 KBs.</small>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                name={'price'}
                                                value={state.product.price}
                                                onChange={validatePrice}
                                                type="number" className={`form-control ${stateError.priceError.length > 0 ? 'is-invalid' : ''} `} placeholder="Price"/>
                                                <small>{stateError.priceError}</small>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required
                                                name={'qty'}
                                                value={state.product.qty}
                                                onChange={validateQty}
                                                type="number" className={`form-control ${stateError.qtyError.length > 0  ? 'is-invalid' : ''} `} placeholder="Qty"/>
                                                <small>{stateError.qtyError}</small>
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                required
                                                name={'category'}
                                                value={state.product.category}
                                                onChange={updateInput}
                                                className="form-control">
                                                <option value="">Select a Category</option>
                                                <option value="MEN_FASHION">Men's Fashion</option>
                                                <option value="WOMEN_FASHION">Women's Fashion</option>
                                                <option value="KIDS_FASHION">Kids Fashion</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <textarea
                                                required
                                                name={'description'}
                                                value={state.product.description}
                                                onChange={updateInput}
                                                rows={3} className="form-control" placeholder="Description"/>
                                        </div>
                                        <div className="mb-2">
                                            <textarea
                                                name={'usage'}
                                                value={state.product.usage}
                                                onChange={updateInput}
                                                rows={3} className="form-control" placeholder="Usage"/>
                                        </div>
                                        <div className="mb-2">
                                        <NavLink to='/' className='btn btn-success btn-sm'>Back</NavLink>
                                        <input
                                            value='Upload'
                                            type='submit' className='btn btn-success btn-sm'/>                                                                                   
                                        </div>                                         
                                    </form>
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
                <div style ={{marginBottom :'120px'}}></div>
            </section>
            
        </React.Fragment>
    )
};
export default ProductUpload;