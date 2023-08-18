const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 
const { RichText, InspectorControls } = wp.blockEditor; 
const { TextControl, PanelBody } = wp.components;

registerBlockType('pacfiftyfour/printform', { 
 
	title: 'Pacific54 Form', 
	icon: 'printer',
    category: 'pacific-fiftyfour', 
    //attributes
    attributes: {
        title:{
            type: 'string',
            default: ''
        },
        linkedblock:{
            type: 'string',
            default: ''
        }

    },   

	edit({attributes, setAttributes}){
		const { title, linkedblock } = attributes;

        function onTitleChange(newtitle){
            setAttributes({title:newtitle});
        } 
        function onFormLinkChange(newtext){
            setAttributes({linkedblock:newtext});
        }

		return ([
            <InspectorControls style={{marginBottom: '20px' }}>
            <PanelBody title="Linked Block">
                <p><strong>Block ID:</strong></p>
                <p>You can link this form to a formlog block by adding an ID to the formlog and then entering the ID here</p>
                <TextControl
                    value={linkedblock}
                    onChange = { onFormLinkChange }
                />
            </PanelBody>,            
        </InspectorControls>,
            <div>
                <div className="pacific-form">
                    <RichText 
                        tagName={"h3"}
                        placeholder={"Set the title to your form"} 
                        value={title} 
                        onChange={(value) => {onTitleChange(value)} } 
                    />
                    <h4>Linked Block: {linkedblock}</h4>
                    <div className="form-inner">
                        <form>
                            <label for="pf-name">🧑 Name:</label>
                            <input type="text" id="pf-name" name="pf-name" disabled />
                            <label for="pf-phone">📱 Phone number:</label>
                            <input type="text" id="pf-phone" name="pf-phone" disabled />
                            <label for="pf-email">✉️ Email:</label>
                            <input type="text" id="pf-email" name="pf-email" disabled />
                            <label for="pf-message">💬 Message:</label>
                            <textarea id="pf-message" name="pf-message" disabled/>
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
		]);
	},
	save({attributes}) {
        const { title, linkedblock } = attributes;
        return(
            <div className="pacific-form">
                <RichText.Content tagName={"h3"} value={title} />
                <div className="form-inner">
                    <form data-action="submit_form_log" data-linked-form={ linkedblock ? linkedblock : '' }>
                        <div className="dialog"></div>
                        
                        <label for="pf-name">🧑 Name:</label>
                        <span id="validate-pf-name"></span>
                        <input type="text" id="pf-name" name="pf-name" data-validate="name" />
                        <label for="pf-phone">📱 Phone number:</label>
                        <span id="validate-pf-phone"></span>
                        <input type="text" id="pf-phone" name="pf-phone" data-validate="phone" />
                        <label for="pf-email">✉️ Email:</label>
                        <span id="validate-pf-email"></span>
                        <input type="text" id="pf-email" name="pf-email" data-validate="email" />
                        <label for="pf-message">💬 Message:</label>
                        <span id="validate-pf-message"></span>
                        <textarea id="pf-message" name="pf-message" data-validate="message" />
                        <button onclick="pacformsubmit(event);">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
});